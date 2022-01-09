import AddPieceForm from "./AddPieceForm";
import pieceSymbol from "../utilities/pieceSymbol";

const Status = ({
  currentHover,
  humanCurrentSelect,
  handleEmpty,
  handleSet,
  handleAddPiece,
  toggleSide,
  toggleHover,
  blackCaptures,
  whiteCaptures,
  handlePrevMove,
  handleNextMove
}) => {
  const [x, y, color] = currentHover;

  const displayCaptures = (captures) => {
    return captures.map((capture, i) => {
      const [piece, color] = capture;

      return (
        <div
          key={i}
          style={{
            display: "inline-block",
            fontFamily: "monospace",
            fontSize: "2em",
          }}
        >
          {pieceSymbol(piece, color)}
        </div>
      );
    })
  }

  return (
    <>
      <div>
        {displayCaptures(blackCaptures)}
      </div>
      <div>
        {displayCaptures(whiteCaptures)}
      </div>
      <div>
        {}
      </div>
      <div>
        Currently selected: {x}, {y}, {color}
      </div>
      <div>position in array: {humanCurrentSelect}</div>
      <button onClick={toggleSide}>toggle side</button>
      <button onClick={toggleHover}>show legal moves</button>
      <button onClick={handleEmpty}>empty board</button>
      <button onClick={handleSet}>reset board</button>
      <div>
        <button onClick={handlePrevMove}>prev move</button>
        <button onClick={handleNextMove}>next move</button>
      </div>
      <div style={{ marginTop: "1em" }}>
        <AddPieceForm handleAddPiece={handleAddPiece} />
      </div>
    </>
  );
};

export default Status;
