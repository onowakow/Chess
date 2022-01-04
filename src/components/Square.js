const Square = ({ type, x, y, handleSelect }) => {
  
  const xy = [
    String.fromCharCode(x + 65), 
    y === 0 ? 8
    : y === 1 ? 7
    : y === 2 ? 6
    : y === 3 ? 5
    : y === 4 ? 4
    : y === 5 ? 3
    : y === 6 ? 2
    : y === 7 ? 1
    : y === 8 ? 0
    : null
  ]
  
  const isWhite = 
    (x % 2 === 0 && y % 2 === 0)
    || (x % 2 === 1 && y % 2 === 1)
     ? true : false
  
  const handleClick = () => {
    console.log(x, y)
    handleSelect(xy)
  }
  
  const style = {
    height: "50px", 
    width: "50px",
    backgroundColor: `${isWhite === true ? 'white' : 'black'}`,
    color: `${isWhite === true ? 'black' : 'white'}`
  }
  return (
    <button onClick={handleClick} style={style}>
      {type}
    </button>
  );
};

export default Square;
