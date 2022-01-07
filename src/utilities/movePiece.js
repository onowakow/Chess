import placePiece from "./placePiece";
import removePiece from "./removePiece";

const movePiece = (board, color, piece, origin, destination) => {
  const [destinationX, destinationY] = destination
  const [originX, originY] = origin

  const boardWithoutPiece = removePiece(board, originX, originY)

  return placePiece(boardWithoutPiece, color, piece, destinationX, destinationY)
}

export default movePiece