import pieceSymbol from "../utilities/pieceSymbol";
import matchingLegalMove from "../utilities/matchingLegalMove";
import isLegalCapture from "../utilities/isLegalCapture";

const Square = ({
  boardSide,
  piece,
  color,
  ix,
  iy,
  handleHover,
  legalMoves,
  handleSelect,
  selectedPiece,
  isHover,
}) => {
  // Board rendering messes up x and y. Reorient.
  const orientIndex = (axis, index, boardSide) => {
    if (boardSide === "b") {
      if (axis === "x") {
        return Math.abs(index - 7);
      } else if (axis === "y") {
        return index;
      }
    } else if (boardSide === "w") {
      if (axis === "x") {
        return index;
      } else if (axis === "y") {
        return Math.abs(index - 7);
      }
    }
  };

  // x and y correspond to the location in the main board array
  const x = orientIndex("x", ix, boardSide);
  const y = orientIndex("y", iy, boardSide);

  /* Checks if square location matches any loc in legalMoves. Returns
     location if found, or false if not found */
  const move = matchingLegalMove(legalMoves, x, y);

  /* Legal move and capture are differentiated. */
  const isMoveLegalCapture = isLegalCapture(move);

  // humanXY adjusts xy to be the traditional 'algebraic' board notation.
  const humanXY = [String.fromCharCode(x + 65), y + 1];

  // Determines basic checkerboard
  const isWhite =
    (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1) ? false : true;

  // Allows for hover to change board appearance.
  const handleMouseOver = () => {
    handleHover(piece, x, y, color, humanXY);
  };

  // Determines if square is currently selected.
  let isSelect = false;
  if (selectedPiece !== null) {
    const [selectedX, selectedY] = selectedPiece;
    isSelect = selectedX === x && selectedY === y ? true : false;
  }

  const style = {
    border: `${isSelect ? "3px solid black" : "none"}`,
    fontFamily: "monospace",
    height: 48,
    width: 48,
    backgroundColor: `${
      isHover
        ? isMoveLegalCapture === true
          ? "red"
          : move !== false
          ? "blue"
          : isWhite === true
          ? "white"
          : "lightBlue"
        : isWhite === true
        ? "white"
        : "lightBlue"
    }`,
    verticalAlign: "top",
  };
  return (
    <button
      onMouseOver={handleMouseOver}
      onClick={() => handleSelect(x, y, color, piece)}
      style={style}
    >
      <p style={{ fontSize: "2em" }}>{pieceSymbol(piece, color)}</p>
    </button>
  );
};

export default Square;
