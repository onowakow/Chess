const ResetButton = ({ win }) => {
  if (win !== false) {
    return (
      <button
        id='reset-button'
        className="rounded-rectangle"
        style={{
          color: "black",
          marginTop: "5px",
        }}
      >
        new game
      </button>
    );
  } else return null;
};

export default ResetButton;
