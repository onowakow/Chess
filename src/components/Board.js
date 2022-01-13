import Square from "./Square";

const Board = ({
  turn,
  selectedPiece,
  handleHover,
  board,
  boardSide,
  legalMoves,
  handleSelect,
}) => {

  const orientBoard = ({ boardSide }) => {
    if (boardSide === "w") {
      return board.slice(0).reverse();
    } else {
      return board.slice(0).map((row) => row.slice(0).reverse());
    }
  };

  return (
    <div
      id="board"
      className='main-unit'
      style={{
        height: '80vh',
        width: "80vh",
        maxHeight: "80vw",
        maxWidth: "80vw",
        margin: "0 auto",
        marginTop: '1em',
        border: "6px solid",
        borderRadius: "3px",
      }}
    >
      {orientBoard({ boardSide }).map((row, iy) => {
        return (
          <div key={iy} className="rail" style={{ height: "12.5%" }}>
            {row.map((square, ix) => {
              // destructure here instead #############
              const [piece, color] = square;
              return (
                <Square
                  key={ix}
                  selectedPiece={selectedPiece}
                  legalMoves={legalMoves}
                  ix={ix}
                  iy={iy}
                  boardSide={boardSide}
                  handleSelect={handleSelect}
                  handleHover={handleHover}
                  piece={piece}
                  color={color}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
