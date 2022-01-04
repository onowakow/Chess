// maps piece letter to unicode
const pieceSymbol = (type, color) => {
  if (color === 'w') {
    return type === 'p' ? '\u2659'
      : type === 'K' ? '\u2654'
      : type === 'Q' ? '\u2655'
      : type === 'R' ? '\u2656'
      : type === 'B' ? '\u2657'
      : type === 'N' ? '\u2658'
      : ''
  } else {
    return type === 'p' ? '\u265F'
    : type === 'K' ? '\u265A'
      : type === 'Q' ? '\u265B'
      : type === 'R' ? '\u265C'
      : type === 'B' ? '\u265D'
      : type === 'N' ? '\u265E'
      : ''
  }
}


export default pieceSymbol