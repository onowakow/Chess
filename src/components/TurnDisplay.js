const TurnDisplay = ({ turn }) => {
  //const text = turn === 'w' ? 'White\'s turn' : 'Black\'s turn'
  let text;
  let bgColor;
  let textColor;

  if (turn === 'w') {
    text = 'White\'s turn'
    bgColor = '#f2f4f7'
    textColor = '#283044'
  } else {
    text = 'Black\'s turn'
    bgColor = '#283044'
    textColor = '#f2f4f7'
  }

  return (
    <div style={{
      backgroundColor: bgColor,
      borderRadius: '5px',
      width: '100%',
      color: textColor,
      textAlign: 'center',
      padding: '.5em',
      marginTop: '1em',
    }}>
      {text}
    </div>
  )
}

export default TurnDisplay