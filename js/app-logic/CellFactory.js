// value should be 0 - 8 or "X" for bomb
function CreateCell(x, y, value) {
  const cell = {
    pos: {
      x,
      y
    },
    isBomb: false,
    value,
    cellState: 'hidden'
  };
  if (value === 'X') { cell.isBomb = true; }

  return cell;
}

export default CreateCell;
