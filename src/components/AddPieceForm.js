import { useState } from 'react'

const AddPieceForm = ({handleAddPiece}) => {
  const [pieceSelect, setPieceSelect] = useState('p')
  const [xSelect, setXSelect] = useState(0)
  const [ySelect, setYSelect] = useState(0)

  const handlePieceSelect = (event) => {
    setPieceSelect(event.target.value)
  }

  const handleXSelect = (event) => {
    setXSelect(event.target.value)
  }

  const handleYSelect = (event) => {
    setYSelect(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddPiece(pieceSelect, xSelect, ySelect)
  }

  return (
    <>
      add a piece
      <form id="add-piece-form" onSubmit={handleSubmit}>
        <label>
          <select value={pieceSelect} onChange={handlePieceSelect} id="piece-select">
            <option value="p">Pawn</option>
            <option value="R">Rook</option>
            <option value="N">Knight</option>
            <option value="B">Bishop</option>
            <option value="Q">Queen</option>
            <option value="K">King</option>
          </select>
        </label>
        <label>
          @
          <select value={xSelect} onChange={handleXSelect} id="select-x">
            <option value={0}>A</option>
            <option value={1}>B</option>
            <option value={2}>C</option>
            <option value={3}>D</option>
            <option value={4}>E</option>
            <option value={5}>F</option>
            <option value={6}>G</option>
            <option value={7}>H</option>
          </select>
          <select value={ySelect} onChange={handleYSelect} id="select-y">
            <option value={0}>1</option>
            <option value={1}>2</option>
            <option value={2}>3</option>
            <option value={3}>4</option>
            <option value={4}>5</option>
            <option value={5}>6</option>
            <option value={6}>7</option>
            <option value={7}>8</option>
          </select>
        </label>
        <button type="submit">add piece</button>
      </form>
    </>
  );
};

export default AddPieceForm;
