const isInBounds = (location) => {
  // location is simple [x, y]
  if (location[0] < 8 && location[1] < 8 && location[0] >= 0 && location[1] >=0) {
    return true
  } else {
    return false
  }
}

// Checks whether a spot is vacant or not. 
// returns false, true, or 'c' for possible capture.
const isVacant = (board, location, pieceColor) => {
  // will be used to check captures.
  const opponentPieceColor = pieceColor === 'w' ? 'b' : 'w'

  const x = location[0]
  const y = location[1]

  const spotData = board[y][x]

  if (spotData[0] === ' ') {
    return true
  } else if (spotData[1] === opponentPieceColor) {
    return 'c'
  } else if (spotData[1] === pieceColor) {
    return false
  }
}

const addCordAndVector = (coordinate, vector) => {
  return [(vector[0] + coordinate[0]), (vector[1] + coordinate[1])]
}

const calculatePossibleMovesBishop = ( board, location, pieceColor ) => {
  // legal move locations stores all possible legal moves for a given piece. It will be returned.
  let legalMoveLocs = []

  // stores potential moves as [add to x, add to y]
  const moveArray = [[1 , 1],[1 , -1],[-1, -1], [-1, 1]]

  // iterate through potential moves. At each one, add each value to x & y until a bound is hit.
  //  bounds: other pieces, edge of board. break may be helpful in ending loops early
  moveArray.forEach((vector) => {
    // calculate next location
    let possibleLocation = addCordAndVector(location, vector)

    // tracks whether a 'collision' has been found. Like a capture.
    let isObstructed = false 

    // Later add conditional formatting for pieces which can only move once.
    while (isInBounds(possibleLocation) && !isObstructed) {
      // check if there exists a piece in that location.
      // designate possible capture with 'c' in index 2 of location.
      // location [4, 4]
      const isLocationVacant = isVacant(board, possibleLocation, pieceColor)
      if (isLocationVacant === false) {
        // stop current loop
        break;

      } else if (isLocationVacant === 'c') {
        // piece obstructed past capture opportunity.
        isObstructed = true
        possibleLocation = [...possibleLocation, 'c']
      }

      // add to final array
      legalMoveLocs.push(possibleLocation)
      possibleLocation = addCordAndVector(possibleLocation, vector)
    } 
  })

  return legalMoveLocs


}

// for testing
const exampleBoard = [
  [["R","w"], ["N","w"], ["B","w"], ["Q","w"], ["K", "w"], ["B", "w"], ["N", "w"], ["R", "w"]],
  [["p","w"], ["p","w"], ["p","w"], ["p","w"], ["p","w"], ["p","w"], ["p", "w"], ["p", "w"]],
  [[" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "]],
  [[" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "]],
  [[" "], [" "], [" "], [" "], ["R","w"], [" "], [" "], [" "]],
  [[" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "]],
  [["p","b"], ["p","b"], ["p","b"], ["p","b"], ["p","b"], ["p","b"], ["p","b"], ["p","b"]],
  [["R","b"], ["N","b"], ["B","b"], ["Q","b"], ["K","b"], ["B","b"], ["N","b"], ["R","b"]],
]

const exampleLocation = [3, 3]

console.log(calculatePossibleMovesBishop(exampleBoard, exampleLocation, 'b'))

// UNCOMMENT after testing
//export default calculatePossibleMovesBishop