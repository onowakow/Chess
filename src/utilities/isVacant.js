// Checks whether a spot is vacant or not. 
// returns false, true, or 'c' for possible capture.
export default function isVacant(board, x, y, pieceColor) {
  // will be used to check captures.
  const opponentPieceColor = pieceColor === 'w' ? 'b' : 'w'

  const spotData = board[y][x]

  if (spotData[0] === ' ') {
    return true
  } else if (spotData[1] === opponentPieceColor) {
    return 'c'
  } else if (spotData[1] === pieceColor) {
    return false
  }
}