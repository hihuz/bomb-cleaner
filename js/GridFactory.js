import CellFactory from './CellFactory';
import { getNeighbors, splitPlan, countBombs } from './utils';

function generateCells(plan) {
  const width = plan[0].length;
  const height = plan.length;
  const split = splitPlan(plan);
  const cells = split.map((planCell, i) => {
    const x = i % width;
    const y = Math.floor(i / width);
    return CellFactory(x, y, planCell);
  });
  return cells;
}

function generateBombsPos(bombs, planSize) {
  let bombsPos = [];
  while(bombsPos.length < bombs) {
    let num = Math.floor(Math.random() * planSize + 1);
    if (bombsPos.indexOf(num)===-1) { bombsPos.push(num); }
  }
  return bombsPos;
}

function generatePlan(width, height, bombs) {
  const bombsPos = generateBombsPos(bombs, width * height);
  let planLine = " ".repeat(width);
  let plan = new Array(height);
  plan.fill(planLine);
  bombsPos.forEach(function(pos) {
    const x = pos % width;
    const y = Math.floor(pos / width);
    let line = plan[y];
    line = line.slice(0, x) + "X" + line.slice(x+1);
    plan[y] = line;
  });
  return plan;
}

function GridFactory(width, height, bombs) {
  const empty = width * height - bombs;
  const plan = generatePlan(width, height, bombs);
  const cells = generateCells(plan);

  return {
    width: width,
    height: height,
    bombs: bombs,
    flags: 0,
    emptyCellsTotal: empty,
    emptyCellsRemaining: empty,
    plan: plan,
    cells: cells
  };
}

export { generateCells, generatePlan, generateBombsPos }; //exported for tests
export default GridFactory;
