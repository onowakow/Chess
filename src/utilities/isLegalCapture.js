const isLegalCapture = (move) => {
  if (move !== false) {
    if (move.length > 2) {
      return move[2] === "c" ? true : false;
    } else {
      return false
    }
  } else {
    return false
  }
}

export default isLegalCapture