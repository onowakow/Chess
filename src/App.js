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
  const [player, setPlayer] = useState('black')

  console.log(player)

  const toggleSide = () => {
    console.log('toggling side')
    setPlayer(player === 'white' ? 'black' : 'white')
  }

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

  // Board array is organized so that Board[0][0] is spot A1
  // To orient the board properly, a shallow reverse is made (order of rows reversed)
  // To orient for black, a reverse is made only on the columns

  const orientBoard = ({player}) => {
    if (player === 'white') {
      return board.slice(0).reverse()
    } else {
      return board.slice(0).map(row => row.slice(0).reverse())
    }
  }

  return (
    <div style={{ display: "inline-block" }}>
      <div
        id="board"
        style={{ display: "inline-block", border: "3px solid", margin: "1em" }}
      >
        {orientBoard({player})
          .map((row, iy) => {
            return (
              <div className='rail' style={{height: 48}}>
                {row.map((square, ix) => {
                  const type = square[0];
                  const color = square[1];
                  return (
                    <div
                      style={{ display: "inline-block" }}
                    >
                      <Square
                        ix={ix}
                        iy={iy}
                        player={player}
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
