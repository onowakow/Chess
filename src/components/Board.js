import Square from './Square'

const Board = ({handleHover, currentSelect, board, player, legalMoves}) => {
  
  const orientBoard = ({player}) => {
    if (player === 'w') {
      return board.slice(0).reverse()
    } else {
      return board.slice(0).map(row => row.slice(0).reverse())
    }
  }

  return (
    <div
        id="board"
        style={{ display: "inline-block", border: "3px solid", margin: "1em" }}
      >
        {orientBoard({player})
          .map((row, iy) => {
            return (
              <div key={iy} className='rail' style={{height: 48}}>
                {row.map((square, ix) => {
                  const type = square[0];
                  const color = square[1];
                  return (
                    <div
                      key={ix}
                      style={{ display: "inline-block" }}
                    >
                      <Square
                        legalMoves={legalMoves}
                        ix={ix}
                        iy={iy}
                        player={player}
                        handleHover={handleHover}
                        type={type}
                        color={color}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
  )
}

export default Board