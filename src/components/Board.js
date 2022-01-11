import Square from "./Square";

const Board = ({
  turn,
  selectedPiece,
  handleHover,
  board,
  boardSide,
  legalMoves,
  handleSelect,
  isHover,
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
      style={{
        height: "85vh",
        width: "85vh",
        maxHeight: "92.5vw",
        maxWidth: "92.5vw",
        margin: "0 auto",
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
                  isHover={isHover}
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
