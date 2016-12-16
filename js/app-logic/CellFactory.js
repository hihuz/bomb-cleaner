// value should be "1" - "8" or "X" for bomb or " " for empty
function CreateCell(index, value) {
  const cell = {
    index,
    isBomb: false,
    flagged: false,
    opened: false,
    value
  };
  if (value === 'X') { cell.isBomb = true; }
  return cell;
}

export default CreateCell;
