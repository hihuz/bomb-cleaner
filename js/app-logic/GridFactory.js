import CreateCell from './CellFactory';
import { countBombs, getNeighbors } from './utils';

/*
function generateCells(plan) {
  const width = plan[0].length;
  const split = splitPlan(plan);
  const cells = split.map((planCell, i) => {
    const value = planCell === "0" ? " " : planCell;
    return CreateCell(i, value);
  });
  return cells;
}
*/

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
/*
function fillPlanValues(plan) {
  let filledPlan = plan.map((line, y) => {
    return line.split('').map((cell, x) => {
      return cell == 'X' ? cell : countBombs(getNeighbors(x, y, plan));
    }).join('');
  });
  return filledPlan;
}
*/
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
/*
function generatePlan(width, height, bombs) {
  const bombsPos = generateBombsPos(bombs, width * height);
  const planLine = ' '.repeat(width);
  const plan = new Array(height);
  plan.fill(planLine);
  bombsPos.forEach((pos) => {
    const x = pos % width;
    const y = Math.floor(pos / width);
    let line = plan[y];
    line = `${line.slice(0, x)}X${line.slice(x + 1)}`;
    plan[y] = line;
  });
  return fillPlanValues(plan);
}
*/
function CreateGrid(width, height, bombs) {
  const empty = (width * height) - bombs;
  const cells = generateCells(width, height, bombs);

  return {
    width,
    height,
    bombs,
    flags: 0,
    emptyCellsRemaining: empty,
    /*plan,*/
    cells
  };
}

export { generateCells, generateBombsPos, fillCellsValues }; // exported for tests
export default CreateGrid;
