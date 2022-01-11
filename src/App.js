import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Status from "./components/Status";
import Board from "./components/Board";
import empty from "./presets/empty";
import traditional from "./presets/traditional";
import placePiece from "./utilities/placePiece";
import calculatePossibleMoves from "./utilities/calculatePossibleMoves";
import movePiece from "./utilities/movePiece";
import TurnDisplay from "./components/TurnDisplay";
import { Container, Row, Col } from "react-bootstrap";

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
  const [board, setBoard] = useState([traditional]);
  const [currentHover, setCurrentHover] = useState([]);

  // current turn in the game.
  const [turn, setTurn] = useState("w");

  // toggle hover displaying possible plays on board
  const [isHover, setIsHover] = useState(true);

  // tracks when a player selects own piece
  const [ownSelect, setOwnSelect] = useState(blankSelect);

  // not a completely necessary state. may refactor later
  const [humanCurrentSelect, setHumanCurrentSelect] = useState(null);
  const [boardSide, setBoardSide] = useState("w");
  const [legalMoves, setLegalMoves] = useState([]);

  // white captures are white pieces captured by black.
  const [whiteCaptures, setWhiteCaptures] = useState([]);
  const [blackCaptures, setBlackCaptures] = useState([]);

  const latestBoardIndex = board.length - 1;

  const toggleSide = () => {
    setBoardSide(boardSide === "w" ? "b" : "w");
  };

  const toggleHover = () => {
    setIsHover(isHover ? false : true);
  };

  const handleAddPiece = (color, piece, x, y) => {
    setBoard(placePiece(board[latestBoardIndex], color, piece, x, y));
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
  /* handleSelect passes select data. Previous select data is set in
  ownSelect */

  const handleSelect = (x, y, color, piece) => {
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
        calculatePossibleMoves(board[latestBoardIndex], piece, x, y, color)
      );

      setOwnSelect({
        legalMoves: calculatePossibleMoves(
          board[latestBoardIndex],
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
              console.log(turn, "wins");
            }
          }

          const updatedBoard = movePiece(
            board[latestBoardIndex],
            ownColor,
            ownPiece,
            ownOrigin,
            destination
          );
          setBoard([...board, updatedBoard]);
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
          calculatePossibleMoves(board[latestBoardIndex], type, x, y, color)
        );
      } else {
        setLegalMoves([]);
      }
      setCurrentHover([x, y, color ? color : null]);
      setHumanCurrentSelect(humanXY);
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
    <Container>
      <Row>
        <Col className="justify-content-center">
          <Board
            turn={turn}
            isHover={isHover}
            selectedPiece={ownSelect.position}
            legalMoves={legalMoves}
            boardSide={boardSide}
            board={board[latestBoardIndex]}
            handleSelect={handleSelect}
            handleHover={handleHover}
          />
          <TurnDisplay turn={turn} />
        </Col>
        <Col>
          <Status
            handlePrevMove={handlePrevMove}
            handleNextMove={handleNextMove}
            blackCaptures={blackCaptures}
            whiteCaptures={whiteCaptures}
            toggleHover={toggleHover}
            toggleSide={toggleSide}
            humanCurrentSelect={humanCurrentSelect}
            currentHover={currentHover}
            handleEmpty={handleEmpty}
            handleSet={handleSet}
            handleAddPiece={handleAddPiece}
          />
        </Col>
      </Row>
    </Container>
  );
}

/* To do:
  -Make UI nicer
  -Allow user to go through past board states
  -Win is announced and gameplay stops
  -Castling?
  -In progress game
  -Adjustable board size?
  -Tell user whose turn it is.
*/

export default App;
