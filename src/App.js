import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Status from "./components/Status";
import Board from "./components/Board";
import empty from "./presets/empty";
import traditional from "./presets/traditional";
import placePiece from "./utilities/placePiece";
import calculatePossibleMoves from "./utilities/calculatePossibleMoves";
import TurnDisplay from "./components/TurnDisplay";
import ResetButton from "./components/ResetButton";
import { Container, Row, Col } from "react-bootstrap";
import movePiece from "./utilities/movePiece";
import deepCopyBoard from "./utilities/deepCopyBoard";

const blankSelect = {
  legalMoves: null,
  position: null,
  color: null,
  piece: null,
};

// data should be stored for each turn. This data includes the locations of
// board pieces as well as if any captures took place. Perhaps including the
// specific turn could also be helpful

function App() {
  const [board, setBoard] = useState([traditional()]);
  const [currentHover, setCurrentHover] = useState([]);

  // Keeps track of win (false, 'w', or 'b')
  const [win, setWin] = useState(false);

  // Stops user from making moves
  const [readOnly, setReadOnly] = useState(false);

  // current turn in the game.
  const [turn, setTurn] = useState("w");

  // tracks when a player selects own piece
  const [ownSelect, setOwnSelect] = useState(blankSelect);
  const [algebraicCurrentHover, setAlgebraicCurrentHover] = useState(["A", 1]);
  const [boardSide, setBoardSide] = useState("w");
  const [legalMoves, setLegalMoves] = useState([]);

  // white captures are white pieces captured by black.
  const [whiteCaptures, setWhiteCaptures] = useState([]);
  const [blackCaptures, setBlackCaptures] = useState([]);

  const [boardIndex, setBoardIndex] = useState(0);

  useEffect(() => {
    setBoardIndex(board.length - 1);
  }, [board.length]);

  const handleBoardHistory = (direction) => {
    const mostRecentBoardIndex = board.length - 1;

    if (board.length > 1) {
      if (direction === -1 && boardIndex > 0) {
        setBoardIndex(boardIndex - 1);
        setReadOnly(true)
      }

      if (direction === 1 && boardIndex < mostRecentBoardIndex) {
        setBoardIndex(boardIndex + 1)
        if (boardIndex + 1 === mostRecentBoardIndex) {
          setReadOnly(false)
        }
      }
    }
  };

  const toggleSide = () => {
    setBoardSide(boardSide === "w" ? "b" : "w");
  };

  const handleAddPiece = (color, piece, x, y) => {
    if (readOnly === true) {
      return;
    }
    const boardCopy = deepCopyBoard(board[boardIndex]);

    const updatedBoard = placePiece(boardCopy, color, piece, x, y);
    setBoard([...board, updatedBoard]);
  };

  const handleNewGame = () => {
    setBoard([traditional()]);
    setWin(false);
    setOwnSelect(blankSelect);
    setTurn("w");
    setLegalMoves([]);
    setWhiteCaptures([]);
    setBlackCaptures([]);
  };

  // allows user to switch between boards
  const handlePrevMove = () => {
    // set turn to previous turn.
    setTurn(turn === "w" ? "b" : "w");
    setOwnSelect(blankSelect);
    setLegalMoves([]);
  };
  const handleNextMove = () => {};

  // ************Game play*******************************
  const handleSelect = (x, y, color, piece) => {
    // Stops handleSelect from modifying the board. For wins and history.
    if (win !== false || readOnly === true) {
      return;
    }

    // if player selects own color set ownSelect.
    if (color === turn) {
      const origin = [x, y];

      // if a piece has already been selected
      if (ownSelect.position !== null) {
        const [prevSelectX, prevSelectY] = ownSelect.position;

        // if player selects same piece twice, deselect.
        if (prevSelectX === x && prevSelectY === y) {
          setOwnSelect(blankSelect);
          return;
        }
      }

      setLegalMoves(
        calculatePossibleMoves(board[boardIndex], piece, x, y, color)
      );

      setOwnSelect({
        legalMoves: calculatePossibleMoves(
          board[boardIndex],
          piece,
          x,
          y,
          color
        ),
        position: origin,
        color: color,
        piece: piece,
      });
    } else {
      // if user has not selected own piece yet, return
      if (ownSelect.position === null) {
        return;
      } else {
        // Check if requested move is legal.
        // Find legal move. Undefined if not found.
        const legalMove = ownSelect.legalMoves.find(
          (move) => move[0] === x && move[1] === y
        );

        // if LEGAL move is made
        if (legalMove !== undefined) {
          // created new vars to hopefully improve readability
          const ownOrigin = ownSelect.position;
          const ownPiece = ownSelect.piece;
          const ownColor = ownSelect.color;
          const destination = [x, y];

          // Check if legal move is a capture
          if (legalMove[2] === "c") {
            if (turn === "w") {
              setBlackCaptures([...blackCaptures, [piece, color]]);
            } else {
              setWhiteCaptures([...whiteCaptures, [piece, color]]);
            }

            // check if King has been captured.
            if (piece === "K") {
              setWin(turn);
            }
          }

          const boardCopyForHistory = deepCopyBoard(board);
          const boardCopyForUpdate = deepCopyBoard(board);

          const updatedBoard = movePiece(
            boardCopyForUpdate[boardIndex],
            ownColor,
            ownPiece,
            ownOrigin,
            destination
          );

          setBoard([...boardCopyForHistory, updatedBoard]);
          setOwnSelect(blankSelect);
          setLegalMoves([]);
          setTurn(turn === "w" ? "b" : "w");
        } else {
          console.log("move is illegal");
        }
      }
    }
  };

  // ************Game play above**************************

  // Displays legalMoves only if isHover and if a piece is not selected
  const handleHover = (type, x, y, color, humanXY) => {
    if (ownSelect.position === null) {
      if (color !== undefined) {
        setLegalMoves(
          calculatePossibleMoves(board[boardIndex], type, x, y, color)
        );
      } else {
        setLegalMoves([]);
      }
      setCurrentHover([x, y, color ? color : null]);
      setAlgebraicCurrentHover(humanXY);
    }
  };

  const handleEmpty = () => {
    setLegalMoves([]);
    setBoard([empty]);
  };

  const handleSet = () => {
    setLegalMoves([]);
    setBoard([traditional]);
  };

  // Board array is organized so that Board[0][0] is spot A1
  // To orient the board properly, a shallow reverse is made (order of rows reversed)
  // To orient for black, a reverse is made only on the columns

  return (
    <>
      <header>
        <h1>Chess demo</h1>
      </header>
      <Container>
        <Row>
          <Col className="justify-content-center">
            <Board
              turn={turn}
              selectedPiece={ownSelect.position}
              legalMoves={legalMoves}
              boardSide={boardSide}
              board={board[boardIndex]}
              handleSelect={handleSelect}
              handleHover={handleHover}
            />
            <TurnDisplay win={win} turn={turn} readOnly={readOnly} />
            <ResetButton handleNewGame={handleNewGame} win={win} />
          </Col>
          <Col>
            <Status
              handleBoardHistory={handleBoardHistory}
              handlePrevMove={handlePrevMove}
              handleNextMove={handleNextMove}
              blackCaptures={blackCaptures}
              whiteCaptures={whiteCaptures}
              toggleSide={toggleSide}
              algebraicCurrentHover={algebraicCurrentHover}
              currentHover={currentHover}
              handleEmpty={handleEmpty}
              handleSet={handleSet}
              handleAddPiece={handleAddPiece}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

/* To do:
  -Make UI nicer
  -Allow user to go through past board states
  -Win is announced and game play stops
  -Castling?
  -In progress game
  -Adjustable board size?
  -Tell user whose turn it is.
*/

export default App;
