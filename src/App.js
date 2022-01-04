import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Square from "./components/Square";
import Status from "./components/Status";
import empty from './presets/empty'
import traditional from "./presets/traditional";
import placePiece from './utilities/placePiece'

function App() {
  const [board, setBoard] = useState(traditional);
  const [currentSelect, setCurrentSelect] = useState(null);
  const [humanCurrentSelect, setHumanCurrentSelect] = useState(null);

  const handleAddPiece = (piece, x, y) => {
    setBoard(placePiece(board, piece, x, y))
  }

  const handleSelect = (xy, humanXY) => {
    setCurrentSelect(xy);
    setHumanCurrentSelect(humanXY);
  };

  const handleEmpty = () => {
    setBoard(empty())
  }

  const handleSet = () => {
    setBoard(traditional())
  }

  return (
    <div style={{ display: "inline-block" }}>
      <div
        id="board"
        style={{ display: "inline-block", border: "3px solid", margin: "1em" }}
      >
        {board
          .slice(0)
          .reverse()
          .map((row, y) => {
            return (
              <div className='rail' style={{height: 48}}>
                {row.map((square, x) => {
                  const type = square[0];
                  const color = square[1];
                  return (
                    <div
                      style={{ display: "inline-block" }}
                    >
                      <Square
                        x={x}
                        y={y}
                        handleSelect={handleSelect}
                        type={type}
                        color={color}
                        currentSelect={currentSelect}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <div>
        <Status
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
