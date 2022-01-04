import { useState } from "react";
import Square from "./components/Square";
import Status from "./components/Status";

function App() {
  const [board, setBoard] = useState([
    [["R"], ["N"], ["B"], ["Q"], ["K"], ["B"], ["N"], ["R"]],
    [["p"], ["p"], ["p"], ["p"], ["p"], ["p"], ["p"], ["p"]],
    [["#"], ["#"], ["#"], ["#"], ["#"], ["#"], ["#"], ["#"]],
    [["#"], ["#"], ["#"], ["#"], ["#"], ["#"], ["#"], ["#"]],
    [["#"], ["#"], ["#"], ["#"], ["#"], ["#"], ["#"], ["#"]],
    [["#"], ["#"], ["#"], ["#"], ["#"], ["#"], ["#"], ["#"]],
    [["p"], ["p"], ["p"], ["p"], ["p"], ["p"], ["p"], ["p"]],
    [["R"], ["N"], ["B"], ["Q"], ["K"], ["B"], ["N"], ["R"]],
  ]);

  const [currentSelect, setCurrentSelect] = useState(null);

  const handleSelect = (xy) => {
    setCurrentSelect(xy);
  };

  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'inline-block'}}>
        <table id="board" style={{borderCollapse: 'collapse'}}>
          <tbody>
            {board
              .slice(0)
              .reverse()
              .map((row, y) => {
                return (
                  <tr>
                    {row.map((square, x) => {
                      const type = square[0] === "#" ? "" : square[0];
                      return (
                        <td>
                          <Square
                            x={x}
                            y={y}
                            handleSelect={handleSelect}
                            type={type}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        <Status currentSelect={currentSelect} />
      </div>
    </div>
  );
}

export default App;
