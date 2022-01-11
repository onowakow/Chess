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
  toggleHover,
  blackCaptures,
  whiteCaptures,
  handlePrevMove,
  handleNextMove,
}) => {
  const [x, y] = algebraicCurrentHover;

  const coordinates = currentHover !== [] 
    ? (`cursor: ${x}, ${y}`) : null

  return (
    <>
      <Container
        style={{
          height: "80vh",
          marginTop: "1em",
          minWidth: "200px",
          borderRadius: "5px",
          color: "#f2f4f7",
          backgroundColor: "#283044",
          padding: "1em",
        }}
      >
        <Row>
          <Col>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-block'}}>Chess demo</h1>
            <h1 style={{display: 'inline-block', textAlign: 'right'}}>{coordinates}</h1>
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
            <Row style={{marginRight: 0}}>
              <section className='info-box'>
                <button className='basic-button'></button>
              </section>
            </Row>
            <Row style={{marginRight: 0}}>
            <section className="info-box">
              <h3>Board history</h3>
            </section>
            </Row>
          </Col>
        </Row>

        <section className="info-box">
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

      {/*
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
      * */}
    </>
  );
};

export default Status;
