// returns false if no matchingLegalMove
// compares a square's location against a legalMoves array.
// returns the matching legal move ex. [1, 5, 'c']

const matchingLegalMove = (legalMoves, x, y) => {
  const move = legalMoves.find(
    (location) => location[0] === x && location[1] === y
  );

  return move === undefined ? false : move
}

export default matchingLegalMove
