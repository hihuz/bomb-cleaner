/*
!!!!!!!!!!!! DO NOT CONFUSE THE CELL COMPONENT OF UI (maybe give it another name ?) AND THE CELL TYPE DESCRIBED HERE !!!!!
*/

//value should be 0 - 8 or "X" for bomb
function CreateCell(x, y, value) {
  const cell = {
    pos: {
      x: x,
      y: y
    },
    isBomb: false,
    value: value,
    cellState: "hidden"
  };
  if (value === "X") { cell.isBomb = true; }

  return cell;
}

export default CreateCell;
