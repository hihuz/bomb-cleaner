import CreateCell from './CellFactory';
import { splitPlan, countBombs, getNeighbors } from './utils';

function generateCells(plan) {
  const width = plan[0].length;
  const split = splitPlan(plan);
  const cells = split.map((planCell, i) => {
    const value = planCell === "0" ? " " : planCell;
    return CreateCell(i, value);
  });
  return cells;
}

function generateBombsPos(bombs, planSize) {
  const bombsPos = [];
  while (bombsPos.length < bombs) {
    const num = Math.floor(Math.random() * planSize);
    if (bombsPos.indexOf(num) === -1) { bombsPos.push(num); }
  }
  return bombsPos;
}


/// ADD TESTS FOR THIS !:::!!!!!! it works tho but still
function fillPlanValues(plan) {
  let filledPlan = plan.map((line, y) => {
    return line.split('').map((cell, x) => {
      return cell == 'X' ? cell : countBombs(getNeighbors(x, y, plan));
    }).join('');
  });
  return filledPlan;
}

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

function CreateGrid(width, height, bombs) {
  const empty = (width * height) - bombs;
  const plan = generatePlan(width, height, bombs);
  const cells = generateCells(plan);

  return {
    width,
    height,
    bombs,
    flags: 0,
    emptyCellsRemaining: empty,
    plan,
    cells
  };
}

export { generateCells, generatePlan, generateBombsPos, fillPlanValues }; // exported for tests
export default CreateGrid;
