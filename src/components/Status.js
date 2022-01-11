import AddPieceForm from "./AddPieceForm";
import DisplayCaptures from "./DisplayCaptures";

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

  return (
    <>
      <div>
        <DisplayCaptures captures={whiteCaptures} />
      </div>
      <div>
        <DisplayCaptures captures={blackCaptures} />
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
