import Square from "./Square";

const Board = ({
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
      style={{ display: "inline-block", border: "3px solid", margin: "1em" }}
    >
      {orientBoard({ boardSide }).map((row, iy) => {
        return (
          <div key={iy} className="rail" style={{ height: 48 }}>
            {row.map((square, ix) => {
              const piece = square[0];
              const color = square[1];
              return (
                <div key={ix} style={{ display: "inline-block" }}>
                  <Square
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
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
