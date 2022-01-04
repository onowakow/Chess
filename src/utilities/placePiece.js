const placePiece = (board, piece, x, y) => {
  // copy of board. I believe react does not recognize an updated
  // board because it seems the same reference. Still not sure, but
  // copying works.

  let boardCopy = [...board]
  boardCopy[y][x] = [piece]
  return boardCopy
}

export default placePiece