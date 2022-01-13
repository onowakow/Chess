const BoardHistory = ({ handleBoardHistory }) => {
  return (
    <section className="info-box">
      <h3>Board history</h3>
      <div className="arrows-holder">
        <div onClick={() => handleBoardHistory(-2)} className="arrow-box">
          <i className="fas fa-angle-double-left arrow" />
        </div>

        <div onClick={() => handleBoardHistory(-1)} className="arrow-box">
          <i className="fas fa-angle-left arrow" />
        </div>
        <div onClick={() => handleBoardHistory(1)} className="arrow-box">
          <i className="fas fa-angle-right arrow" />
        </div>
        <div onClick={() => handleBoardHistory(2)} className="arrow-box">
          <i className="fas fa-angle-double-right arrow" />
        </div>
      </div>
    </section>
  );
};

export default BoardHistory;
