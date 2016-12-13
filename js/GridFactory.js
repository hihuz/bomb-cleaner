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

/**** THIS LOOKS BUGGED ****/
/*** GENERATES 11 INSTEAD OF 10 SOME TIMES ?? WTF ??? ****/
function generatePlan(width, height, bombs) {
  const planSize = width * height;
  let bombsPos = [];

  while(bombsPos.length < bombs) {
    let num = Math.floor(Math.random() * planSize + 1);
    if (bombsPos.indexOf(num)===-1) { bombsPos.push(num); }
  }
  let planLine = " ".repeat(width);
  let plan = new Array(height);
  plan.fill(planLine);
  console.log(plan);
  /* I DISPLACE THE POS HERE BELOW EACH TIME I INSERT A BOMB... NICE JOB..*/
  /* CLOSURES FTW */
  /* FIX THIS**/
  bombsPos.forEach(function(pos) {
    const x = pos % height;
    const y = Math.floor(pos / height);
    let line = plan[y];
    line = line.slice(0, x) + "X" + line.slice(x+1);
    plan[y] = line;
  });
  console.log(plan);
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

export { generateCells, generatePlan }; //exported for tests
export default GridFactory;
