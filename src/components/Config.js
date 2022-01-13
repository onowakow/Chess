import AddPieceForm from "./AddPieceForm";
import DisplayCaptures from "./DisplayCaptures";
import BoardHistory from "./BoardHistory";
import { Container, Row, Col } from "react-bootstrap";
import SwapBoardOrientation from "./SwapBoardOrientation";

const Config = ({
  currentHover,
  algebraicCurrentHover,
  handleAddPiece,
  toggleSide,
  blackCaptures,
  whiteCaptures,
  handleBoardHistory,
  readOnly,
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
              <h1 style={{ display: "inline-block" }}>Configure board</h1>
              <h1 style={{ display: "inline-block", textAlign: "right" }}>
                {coordinates}
              </h1>
            </div>
            <section className="info-box">
              <h2>About</h2>
              This app demonstrates a responsive chess board. Piece movement is
              limited to only legal possibilities. When hovering over a piece,
              the legal moves are shown by dots while legal captures are shown
              by corner accents. Play around with the board and see its
              capabilities!
            </section>
          </Col>
        </Row>

        <Row>
          <Col>
            <AddPieceForm readOnly={readOnly} handleAddPiece={handleAddPiece} />
          </Col>
          <Col>
            <Row style={{ marginRight: 0 }}>
              <SwapBoardOrientation toggleSide={toggleSide} />
            </Row>
            <Row style={{ marginRight: 0 }}>
              <BoardHistory handleBoardHistory={handleBoardHistory} />
            </Row>
          </Col>
        </Row>

        <section className="info-box">
          <h3>
            Current captures:{" "}
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

export default Config;
