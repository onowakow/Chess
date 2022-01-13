const SwapBoardOrientation = ({ toggleSide }) => {
  return (
    <section className="info-box">
      <button
        id="toggle-view-button"
        onClick={toggleSide}
        className="basic-button"
      >
        swap board orientation
      </button>
    </section>
  );
};

export default SwapBoardOrientation