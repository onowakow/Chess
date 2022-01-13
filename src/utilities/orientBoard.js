const orientBoard = (boardSide, board) => {
  if (boardSide === "w") {
    return board.slice(0).reverse();
  } else {
    return board.slice(0).map((row) => row.slice(0).reverse());
  }
};

export default orientBoard