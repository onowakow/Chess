import AddPieceForm from "./AddPieceForm";

const Status = ({
  currentSelect,
  humanCurrentSelect,
  handleEmpty,
  handleSet,
  handleAddPiece,
  toggleSide
}) => {
  let x = "";
  let y = "";

  if (currentSelect !== null) {
    [x, y] = currentSelect;
  }

  return (
    <>
      <div>
        Currently selected: {x}, {y}
      </div>
      <div>position in array: {humanCurrentSelect}</div>
      <button onClick={toggleSide}>toggle side</button>
      <button onClick={handleEmpty}>empty board</button>
      <button onClick={handleSet}>reset board</button>
      <div style={{marginTop: '1em'}}>
        <AddPieceForm handleAddPiece={handleAddPiece} />
      </div>
    </>
  );
};

export default Status;
