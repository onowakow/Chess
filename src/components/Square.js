import pieceSymbol from "../utilities/pieceSymbol";
import matchingLegalMove from '../utilities/matchingLegalMove'
import isLegalCapture from "../utilities/isLegalCapture";

const Square = ({ player, type, color, ix, iy, handleSelect, legalMoves }) => {
  const orientIndex = (axis, index, player) => {
    if (player === "b") {
      if (axis === "x") {
        return Math.abs(index - 7);
      } else if (axis === "y") {
        return index;
      }
    } else if (player === "w") {
      if (axis === "x") {
        return index;
      } else if (axis === "y") {
        return Math.abs(index - 7);
      }
    }
  };

  // x and y correspond to the location in the main board array
  const x = orientIndex("x", ix, player);
  const y = orientIndex("y", iy, player);

  // ********LOOKS FOR LEGAL MOVE/CAPTURE FOR GIVEN SQUARE*************************************
  /* Two roles here. Is this square a legal move for the currently selected piece? */
  /* Is this square a legal capture? */

  // Checks if square location matches any loc in legalMoves. Returns
  //  location if found, or false if not found
  const move = matchingLegalMove(legalMoves, x, y)

  const isMoveLegalCapture = isLegalCapture(move)

  // ******************************************

  // xy corresponds to the location in the board array
  // const xy = [x, y];

  // humanXY adjusts xy to be the traditional 'algebraic' board notation.
  const humanXY = [String.fromCharCode(x + 65), y + 1];

  const isWhite =
    (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1) ? true : false;

  const handleClick = () => {
    handleSelect(x, y, color, humanXY);
  };

  const style = {
    border: "none",
    fontFamily: "monospace",
    height: 48,
    width: 48,
    backgroundColor: `${
      isMoveLegalCapture === true
        ? "red"
        : move !== false
        ? "blue"
        : isWhite === true
        ? "white"
        : "lightBlue"
    }`,
    verticalAlign: "top",
  };
  return (
    <button onClick={handleClick} style={style}>
      <p style={{ fontSize: "2em" }}>{pieceSymbol(type, color)}</p>
    </button>
  );
};

export default Square;
