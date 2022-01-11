const ResetButton = ({ win, handleNewGame }) => {
  if (win !== false) {
    return (
      <div
        onClick={handleNewGame}
        id='reset-button'
        className="rounded-rectangle"
        style={{
          color: "black",
          marginTop: "5px",
        }}
      >
        new game
      </div>
    );
  } else return null;
};

export default ResetButton;
