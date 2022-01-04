import pieceSymbol from "../utilities/pieceSymbol";

const Square = ({ player, type, color, ix, iy, handleSelect, currentSelect }) => {
  
  const orientIndex = (axis, index, player) => {
    if (player === 'black') {
      if (axis === 'x') {
        return Math.abs(index - 7)
      } else if (axis === 'y') {
        return index + 1
      }
    } else if (player === 'white') {
      if (axis === 'x') {
        return index
      } else if (axis === 'y') {
        return Math.abs(index - 8)
      }
    }
  }

  // x and y correspond to the location in the main board array
  const x = (orientIndex( 'x', ix, player ))
  const y = (orientIndex( 'y', iy, player ))

  // xy corresponds to the location in the board array
  const xy = [x, y]

  // humanXY adjusts xy to be the traditional 'algebraic' board notation.
  const humanXY = [String.fromCharCode(x + 65), y];

  const isWhite =
    (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1) ? true : false;

  const handleClick = () => {
    handleSelect(xy, humanXY);
  };

  const style = {
    border: "none",
    fontFamily: "monospace",
    height: 48,
    width: 48,
    backgroundColor: `${isWhite === true ? "white" : "lightBlue"}`,
    verticalAlign: "top",
  };
  return (
    <button onClick={handleClick} style={style}>
      <p style={{ fontSize: "2em" }}>{pieceSymbol(type, color)}</p>
    </button>
  );
};

export default Square;
