import AddPieceForm from "./AddPieceForm";
import DisplayCaptures from "./DisplayCaptures";
import { Container, Row, Col } from "react-bootstrap";

const Status = ({
  currentHover,
  algebraicCurrentHover,
  handleEmpty,
  handleSet,
  handleAddPiece,
  toggleSide,
  blackCaptures,
  whiteCaptures,
  handlePrevMove,
  handleNextMove,
}) => {
  const [x, y] = algebraicCurrentHover;

  const coordinates = currentHover !== [] ? `cursor: ${x}, ${y}` : null;

  return (
    <>
      <Container
        style={{
          minHeight: "80vh",
          marginTop: "1em",
          minWidth: "300px",
          borderRadius: "5px",
          color: "#f2f4f7",
          backgroundColor: "#283044",
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 style={{ display: "inline-block" }}>Chess demo</h1>
              <h1 style={{ display: "inline-block", textAlign: "right" }}>
                {coordinates}
              </h1>
            </div>
            <section className="info-box">
              <h2>About</h2>
              This app demonstrates a responsive chess board. Piece movement is
              limited to only legal possibilities. When hovering over a piece,
              the legal moves are shown by dots while legal captures are shown
              by corner accents.
            </section>
          </Col>
        </Row>

        <Row>
          <Col>
            <section className="info-box">
              <h3>Add piece to board</h3>
              <AddPieceForm handleAddPiece={handleAddPiece} />
            </section>
          </Col>
          <Col>
            <Row style={{ marginRight: 0 }}>
              <section className="info-box">
                <button
                  id="toggle-view-button"
                  onClick={toggleSide}
                  className="basic-button"
                >
                  swap board orientation
                </button>
              </section>
            </Row>
            <Row style={{ marginRight: 0 }}>
              <section className="info-box">
                <h3>Board history</h3>
                <div className="arrows-holder">
                  <div className="arrow-box">
                    <i className="fas fa-angle-double-left arrow" />
                  </div>
                  <div className="arrow-box">
                    <i className="fas fa-angle-left arrow" />
                  </div>
                  <div className="arrow-box">
                    <i className="fas fa-angle-right arrow" />
                  </div>
                  <div className="arrow-box">
                    <i className="fas fa-angle-double-right arrow" />
                  </div>
                </div>
              </section>
            </Row>
          </Col>
        </Row>

        <section className="info-box">
          <h3>
            Captures:{" "}
            {whiteCaptures.length < 1 && blackCaptures.length < 1
              ? "(none)"
              : null}
          </h3>
          <Row>
            <Col>
              <DisplayCaptures captures={whiteCaptures} />
            </Col>
          </Row>

          <Row>
            <Col>
              <DisplayCaptures captures={blackCaptures} />
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
};

export default Status;
