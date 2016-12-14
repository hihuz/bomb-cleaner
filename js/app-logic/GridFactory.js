import CreateCell from './CellFactory';
import { splitPlan } from './utils';

function generateCells(plan) {
  const width = plan[0].length;
  const split = splitPlan(plan);
  const cells = split.map((planCell, i) => {
    const x = i % width;
    const y = Math.floor(i / width);
    return CreateCell(x, y, planCell);
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
  return plan;
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
    emptyCellsTotal: empty,
    emptyCellsRemaining: empty,
    plan,
    cells
  };
}

export { generateCells, generatePlan, generateBombsPos }; // exported for tests
export default CreateGrid;
