import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Status from "./components/Status";
import Board from './components/Board'
import empty from './presets/empty'
import traditional from "./presets/traditional";
import placePiece from './utilities/placePiece'
import calculatePossibleMoves from "./utilities/calculatePossibleMoves";

function App() {
  const [board, setBoard] = useState(traditional);
  const [currentSelect, setCurrentSelect] = useState([]);
  const [humanCurrentSelect, setHumanCurrentSelect] = useState(null);
  const [player, setPlayer] = useState('w')
  const [legalMoves, setLegalMoves] = useState([])

  const toggleSide = () => {
    setPlayer(player === 'w' ? 'b' : 'w')
  }

  const handleAddPiece = (color, piece, x, y) => {
    setBoard(placePiece(board, color, piece, x, y))
  }

  const handleHover = (type, x, y, color, humanXY) => {
    // Only calculate legal moves if a piece (only pieces have color). else, clear legalMoves
    if (color !== undefined) {
      setLegalMoves(calculatePossibleMoves(board, type, x, y, color))
    } else {
      setLegalMoves([])
    }
    setCurrentSelect([x, y, color ? color : null]);
    setHumanCurrentSelect(humanXY);
  };

  const handleEmpty = () => {
    setLegalMoves([])
    setBoard(empty())
  }

  const handleSet = () => {
    setLegalMoves([])
    setBoard(traditional())
  }

  // Board array is organized so that Board[0][0] is spot A1
  // To orient the board properly, a shallow reverse is made (order of rows reversed)
  // To orient for black, a reverse is made only on the columns

  return (
    <div style={{ display: "inline-block" }}>
      <Board legalMoves={legalMoves} player={player} board={board} handleHover={handleHover} currentSelect={currentSelect}/>
      <div>
        <Status
          toggleSide={toggleSide}
          humanCurrentSelect={humanCurrentSelect}
          currentSelect={currentSelect}
          handleEmpty={handleEmpty}
          handleSet={handleSet}
          handleAddPiece={handleAddPiece}
        />
      </div>
    </div>
  );
}

export default App;
