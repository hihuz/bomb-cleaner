import CreateCell from './CellFactory';
import { countBombs, getNeighbors } from './utils';

// fills values of an "empty" array of cells
function fillCellsValues(cells, width) {
  const filledCells = cells.map((cell, i) => {
    const count = countBombs(getNeighbors(i, cells, width));
    if (cell.value === 'X' || count === 0) { return cell; }
    return Object.assign({}, cell, {
      value: count
    });
  });
  return filledCells;
}

// generates an array of indexes to place bombs, excluding the index (3rd param)
function generateBombsPos(bombs, gridSize, index) {
  const bombsPos = [];
  while (bombsPos.length < bombs) {
    const num = Math.floor(Math.random() * gridSize);
    if (bombsPos.indexOf(num) === -1 && num !== index) { bombsPos.push(num); }
  }
  return bombsPos;
}

// generates an array of cells with all properties defined
function generateCells(width, height, bombs, index) {
  const gridSize = width * height;
  const bombsPos = generateBombsPos(bombs, gridSize, index);
  const cells = new Array(gridSize)
  .fill(undefined)
  .map((cell, i) => (bombsPos.indexOf(i) === -1 ? CreateCell(i, ' ') : CreateCell(i, 'X')));
  return fillCellsValues(cells, width, height);
}

// called on first click so that the initial click is never a bomb
function fillGrid(index, grid) {
  const cells = generateCells(grid.width, grid.height, grid.bombs, index);
  return Object.assign({}, grid, { cells });
}

function CreateGrid(width, height, bombs) {
  const empty = (width * height) - bombs;
  const cells = new Array(width * height)
  .fill(undefined)
  .map((cell, i) => ({ index: i }));

  return {
    width,
    height,
    bombs,
    flags: 0,
    emptyCellsRemaining: empty,
    cells
  };
}

export { generateCells, generateBombsPos, fillCellsValues, fillGrid }; // exported for tests
export default CreateGrid;
