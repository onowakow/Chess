import pieceSVG from "../utilities/pieceSVG";

const DisplayCaptures = ({ captures }) => {
  if (captures.length > 0) {
    return (
      <div style={{ width: '100%'}}>
        {captures.map((capture, i) => {
          const [piece, color] = capture;
          return (
            <div key={i} style={{display: "inline-block"}}>
              <img
                src={pieceSVG(piece, color)}
                alt="white queen"
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default DisplayCaptures;
