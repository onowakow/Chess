import isInBounds from "./isInBounds";
import isVacant from "./isVacant";
import addCordAndVector from "./addCordAndVector";

/* Still some strangeness to code. 

  I'm not sure I will get to this last one. I'll need to think on it.
  -pieces may not move in a way which puts their king in check
*/

const calculatePossibleMoves = (board, pieceType, x, y, pieceColor) => {
  // legal move locations stores all possible legal moves for a given piece. It will be returned.
  let legalMoveLocs = [];

  // assigns legal moves to each piece in format [add to y, add to x] (in the nature of slope notation)
  const moveArrayObject = {
    B: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ],
    R: [
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ],
    Q: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ],
    K: [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ],
    N: [
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
      [1, 2],
    ],
    pw: [[1, 0], [1, -1], [1, 1], [2, 0]],
    pb: [[-1, 0], [-1, -1], [-1, 1], [-2, 0]]
  };

  // assigns limits to piece movement.
  const isDistanceLimitedObject = {
    B: false,
    R: false,
    Q: false,
    K: true,
    N: true,
    p: true
  };

  // find appropriate move array. Ternary is due to directionality of pawns
  const moveArray = moveArrayObject[pieceType === 'p' ? `p${pieceColor}` : pieceType];
  const isDistanceLimited = isDistanceLimitedObject[pieceType];

  // iterate through potential moves. At each one, add each value to x & y until a bound is hit.
  //  bounds: other pieces, edge of board. break may be helpful in ending loops early
  // 'vector' refers to the [add to y, add to x] arrays. Not exactly an actual vector
  moveArray.forEach((vector) => {
    // INIT for scope reasons
    let isObstructed;
    // calculate first location
    let possibleLocation = addCordAndVector(x, y, vector);

    do {
      // check that piece is in bounds
      if (isInBounds(possibleLocation) === false) {
        return;
      }

      // check if location is vacant. Stores false, true, or 'c' for capture.
      const isLocationVacant = isVacant(
        board,
        possibleLocation[0],
        possibleLocation[1],
        pieceColor
      );

      // No possible move found. Only returns false if no capture and not vacant
      if (isLocationVacant === false) {
        return;
      }

      if (isLocationVacant === "c") {
        isObstructed = true;
        possibleLocation = [...possibleLocation, "c"];
      }

      // PAWN strangeness...
      if (pieceType === 'p') {
        // Only allow movement in x-direction IF there's a capture
        if (isLocationVacant !== 'c' && vector[1] !== 0) {
          return
        }
        // Conversely, only allow capture if in x-direction 
        if (isLocationVacant === 'c' && vector[1] === 0) {
          return
        }

        if (Math.abs(vector[0]) === 2) {
          // split pawn behavior by color
          if (pieceColor === 'w') {
            // if pawn is not on the second row...
            if (y !== 1) {
              return
            }
          } else if (pieceColor === 'b') {
            if (y !== 6) {
              return
            }
          }
        }        
      }
      /* END pawn strangeness */

      if (pieceType === 'p' && isLocationVacant !== 'c' && vector[1] !== 0) {
        return
      }

      legalMoveLocs.push(possibleLocation);

      possibleLocation = addCordAndVector(
        possibleLocation[0],
        possibleLocation[1],
        vector
      );
    } while (!isDistanceLimited && !isObstructed);

    //*************************************** */
    /*
    if (isDistanceLimited === false) {
      // Later add conditional formatting for pieces which can only move once.
      while (isInBounds(possibleLocation) && !isObstructed) {

        // check if there exists a piece in that location.
        // designate possible capture by returning 'c'.
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
    }*/
  });

  return legalMoveLocs;
};

export default calculatePossibleMoves;
