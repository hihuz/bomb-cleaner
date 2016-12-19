import CreateCell from './CellFactory';
import { countBombs, getNeighbors } from './utils';

function generateCells(width, height, bombs) {
  const gridSize = width * height;
  const bombsPos = generateBombsPos(bombs, gridSize);
  const cells = new Array(gridSize)
  .fill(undefined)
  .map((cell, i) => {
    return bombsPos.indexOf(i) === -1 ? CreateCell(i, " ") : CreateCell(i, "X");
  });
  return fillCellsValues(cells, width, height);
}

function generateBombsPos(bombs, gridSize) {
  const bombsPos = [];
  while (bombsPos.length < bombs) {
    const num = Math.floor(Math.random() * gridSize);
    if (bombsPos.indexOf(num) === -1) { bombsPos.push(num); }
  }
  return bombsPos;
}

function fillCellsValues(cells, width) {
  let filledCells = cells.map((cell, i) => {
    const count = countBombs(getNeighbors(i, cells, width));
    if (cell.value === 'X' || count === 0) { return cell; }
    return Object.assign({}, cell, {
      value: count
    });
  });
  return filledCells;
}

function CreateGrid(width, height, bombs) {
  const empty = (width * height) - bombs;
  const cells = generateCells(width, height, bombs);

  return {
    width,
    height,
    bombs,
    flags: 0,
    emptyCellsRemaining: empty,
    cells
  };
}

export { generateCells, generateBombsPos, fillCellsValues }; // exported for tests
export default CreateGrid;
