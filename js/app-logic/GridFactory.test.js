import CreateGrid, { generateCells, generateBombsPos, fillCellsValues } from './GridFactory';
import CreateCell from './CellFactory';
import { countBombs } from './utils';

test('generateCells should generate an array of cells based off params', () => {
  const width = 8;
  const height = 11;
  const bombs = 38;

  const actual = generateCells(width, height, bombs);
  const actualBombs = actual.filter((cell) => {
    return cell.value === 'X';
  });
  const actualCells = actual.filter((cell) => {
    return cell.value && !cell.flagged && !cell.opened && !isNaN(cell.index);
  });

  expect(actual.length).toEqual(width * height);
  expect(actualBombs.length).toEqual(bombs);
  expect(actualCells.length).toEqual(actual.length);
});

test('generateBombsPos should return an array of unique values between 0 and planSize', () => {
  const gridSize = 120;
  const bombs = 15;
  const bombsPos = generateBombsPos(bombs, gridSize);
  expect(bombsPos.length).toEqual(15);
  expect(Math.max(...bombsPos) <= gridSize).toEqual(true);
  expect(new Set(bombsPos).size).toEqual(bombsPos.length);
});

test('fillCellsValues should fill an array of cells with values equal to bomb neighbors', () => {
  const width = 3;
  const cells = [
    CreateCell(0, 'X'),
    CreateCell(1, ' '),
    CreateCell(2, ' '),
    CreateCell(3, 'X'),
    CreateCell(4, ' '),
    CreateCell(5, ' '),
    CreateCell(6, ' '),
    CreateCell(7, ' '),
    CreateCell(8, ' '),
    CreateCell(9, ' '),
    CreateCell(10, ' '),
    CreateCell(11, ' ')
  ];
  const expected = [
    CreateCell(0, 'X'),
    CreateCell(1, 2),
    CreateCell(2, ' '),
    CreateCell(3, 'X'),
    CreateCell(4, 2),
    CreateCell(5, ' '),
    CreateCell(6, 1),
    CreateCell(7, 1),
    CreateCell(8, ' '),
    CreateCell(9, ' '),
    CreateCell(10, ' '),
    CreateCell(11, ' ')
  ];
  expect(fillCellsValues(cells, width)).toEqual(expected);
});
/*
test('fillPlanValues should fill a plan with numbers of bomb neighbors', () => {
  const planBefore = [
    " X  ",
    "  X ",
    "XX  ",
    "  X ",
  ];
  const planAfter = [
    "1X21",
    "34X1",
    "XX32",
    "23X1",
  ];
  expect(fillPlanValues(planBefore)).toEqual(planAfter);
});
*/
/*
test('generatePlan should generate a random plan based off params', () => {
  const plan = generatePlan(10, 12, 60);
  const split = splitPlan(plan);
  plan.forEach((line) => {
    expect(line.length).toEqual(10);
  });
  expect(split.length).toEqual(10 * 12);
  expect(plan.length).toEqual(12);
  expect(countBombs(split)).toEqual(60);
});

test('another test for generatePlan on small plans', () => {
  const plan = generatePlan(1, 1, 1);
  const split = splitPlan(plan);
  expect(plan.length).toEqual(1);
  expect(plan[0].length).toEqual(1);
  expect(countBombs(split)).toEqual(1);
  expect(plan).toEqual(['X']);
});
*/
test('CreateGrid should.. well.. create a grid', () => {
  const grid = CreateGrid(8, 12, 50);
  expect(grid.width).toEqual(8);
  expect(grid.height).toEqual(12);
  expect(grid.bombs).toEqual(50);
  expect(grid.flags).toEqual(0);
  expect(grid.emptyCellsRemaining).toEqual(46);
  expect(grid.cells.length).toEqual(8 * 12);
});
