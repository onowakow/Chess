import isInBounds from "./isInBounds"
import isVacant from "./isVacant"
import addCordAndVector from './addCordAndVector'


const calculatePossibleMovesBishop = ( board, x, y, pieceColor ) => {
  // legal move locations stores all possible legal moves for a given piece. It will be returned.
  let legalMoveLocs = []

  // stores potential moves as [add to x, add to y]
  const moveArray = [[1 , 1],[1 , -1],[-1, -1], [-1, 1]]

  // iterate through potential moves. At each one, add each value to x & y until a bound is hit.
  //  bounds: other pieces, edge of board. break may be helpful in ending loops early
  moveArray.forEach((vector) => {
    // calculate next location
    let possibleLocation = addCordAndVector(x, y, vector)

    // tracks whether a 'collision' has been found. Like a capture.
    let isObstructed = false 

    // Later add conditional formatting for pieces which can only move once.
    while (isInBounds(possibleLocation) && !isObstructed) {
      // check if there exists a piece in that location.
      // designate possible capture with 'c' in index 2 of location.
      // location [4, 4]
      const isLocationVacant = isVacant(board, possibleLocation[0], possibleLocation[1], pieceColor)
      
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

      // move to next possible location
      possibleLocation = addCordAndVector(possibleLocation[0], possibleLocation[1], vector)
    } 
  })

  return legalMoveLocs


}

export default calculatePossibleMovesBishop