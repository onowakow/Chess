const removePiece = (board, x, y) => {
  let boardCopy = [...board]
  boardCopy[y][x] = [' ']
  return boardCopy
}

export default removePiece