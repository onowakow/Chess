// uses recursion to deeply copy multi-dimensional array (accounts for javascript arrays only containing references)

const deepCopyBoard = ( boardArr ) => {
  let newArr = []

  newArr = boardArr.map(elem => {
    if (typeof elem === 'object') {
      return newArr = deepCopyBoard(elem)
    } else {
      return elem
    }
  })
  
  return newArr
}

export default deepCopyBoard