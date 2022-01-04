import pieceSymbol from "../utilities/pieceSymbol";

const Square = ({ type, color, x, y, handleSelect, currentSelect }) => {
  /* Board is rendered top down, so y value is 'reversed' 
  There may be a more elegant way to do this, but hard-
  coding seems fine given that the board will only be 8*8
  */
 const yAdjust =
 y === 0
 ? 8
      : y === 1
      ? 7
      : y === 2
      ? 6
      : y === 3
      ? 5
      : y === 4
      ? 4
      : y === 5
      ? 3
      : y === 6
      ? 2
      : y === 7
      ? 1
      : y === 8
      ? 0
      : null;
      
  // xy corresponds to the location in the board array
  const xy = [x, yAdjust - 1];

  // humanXY adjusts xy to be the traditional 'algebraic' board notation.
  const humanXY = [
    String.fromCharCode(x + 65),
    yAdjust
  ];

  const isWhite =
    (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1) ? true : false;

  const handleClick = () => {
    handleSelect(xy, humanXY);
  };

  const style = {
    border: 'none',
    fontFamily: 'monospace',
    height: 48,
    width: 48,
    backgroundColor: `${isWhite === true ? "white" : "lightBlue"}`,
    verticalAlign: 'top'
  };
  return (
    <button onClick={handleClick} style={style}>
      <p style={{fontSize: '2em',}}>
      {pieceSymbol(type, color)}
      </p>
    </button>
  );
};

export default Square;
