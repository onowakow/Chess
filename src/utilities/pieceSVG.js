// maps piece type and color to a wikipedia link.
// ALL PIECES BY:
// Cburnett - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=1499812
const pieceSVG = (type, color) => {
  if (color === 'w') {
    return type === 'p' ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
      : type === 'K' ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg'
      : type === 'Q' ? 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg'
      : type === 'R' ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
      : type === 'B' ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg'
      : type === 'N' ? 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Blank.png'
  } else {
    return type === 'p' ? 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
    : type === 'K' ? 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg'
      : type === 'Q' ? 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg'
      : type === 'R' ? 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg'
      : type === 'B' ? 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg'
      : type === 'N' ? 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Blank.png'
  }
}


export default pieceSVG