const TurnDisplay = ({ readOnly, turn, win }) => {
  //const text = turn === 'w' ? 'White\'s turn' : 'Black\'s turn'
  let text;
  let bgColor;
  let textColor;

  if (readOnly === true) {
    text="Showing board history. Read only."
    bgColor="#c14953"
    textColor="white"
  } else {
    if (win === false) {
      if (turn === "w") {
        text = "White's turn";
        bgColor = "#f2f4f7";
        textColor = "#283044";
      } else {
        text = "Black's turn";
        bgColor = "#283044";
        textColor = "#f2f4f7";
      }
    } else {
      bgColor = "#FF8811";
      textColor = "white";

      if (win === "w") {
        text = "White wins!";
      } else {
        text = "Black wins!";
      }
    }
  }

  return (
    <div
      className="rounded-rectangle"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        marginTop: 5,
      }}
    >
      {text}
    </div>
  );
};

export default TurnDisplay;
