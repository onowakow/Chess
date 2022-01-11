import pieceSVG from "../utilities/pieceSVG";
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

  // default square color
  const squareColor = isWhite === true ? "white" : "#a6c9b0";

  const square = {
    width: "12.5%",
    paddingBottom: "12.5%",
    display: "inline-block",
    position: "relative",
    overflow: "hidden",
    float: "left",
    backgroundColor: squareColor,
  };

  const content = {
    position: "absolute",
    height: "100%",
    width: "100%",
  };

  // displays when piece is selected
  const selectBorder = {
    height: "100%",
    border: `${isSelect ? "3px solid black" : "none"}`,
  };

  // displays possible move token
  const possibleMove = {
    height: "30%",
    width: "30%",
    margin: "35%",
    borderRadius: "35%",
    backgroundColor: `${move !== false ? "blue" : squareColor}`,
  };

  const possibleCapture = {
    height: "100%",
    width: "100%",
    backgroundColor: 'red',
  };

  const possibleCaptureTwo = {
    height: "100%",
    width: "100%",
    backgroundColor: squareColor,
    borderRadius: "25%",
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onClick={() => handleSelect(x, y, color, piece)}
      style={square}
      key={ix}
    >
      {isMoveLegalCapture ? (
        <div style={content}>
          <div style={possibleCapture}>
            <div style={content}>
              <div style={possibleCaptureTwo} />
            </div>
          </div>
        </div>
      ) : (
        <div style={content}>
          <div style={possibleMove} />
        </div>
      )}

      <div style={content}>
        <img src={pieceSVG(piece, color)} width="100%" alt="white queen" />
      </div>
      <div style={content}>
        <div style={selectBorder} />
      </div>
    </div>
  );
};

export default Square;
