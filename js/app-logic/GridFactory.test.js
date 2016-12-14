import CreateGrid, { generateCells, generatePlan, generateBombsPos } from './GridFactory';
import CreateCell from './CellFactory';
import { countBombs, splitPlan } from './utils';

test('generateCells should generate cells based off a given plan', () => {
  const plan = ['X11X',
    '1111',
    '0000'];
  const cells = [CreateCell(0, 0, 'X'),
    CreateCell(1, 0, '1'),
    CreateCell(2, 0, '1'),
    CreateCell(3, 0, 'X'),
    CreateCell(0, 1, '1'),
    CreateCell(1, 1, '1'),
    CreateCell(2, 1, '1'),
    CreateCell(3, 1, '1'),
    CreateCell(0, 2, '0'),
    CreateCell(1, 2, '0'),
    CreateCell(2, 2, '0'),
    CreateCell(3, 2, '0')];

  expect(generateCells(plan)).toEqual(cells);
});

test('generateBombsPos should return an array of unique values between 0 and planSize', () => {
  const planSize = 120;
  const bombs = 15;
  const bombsPos = generateBombsPos(bombs, planSize);
  expect(bombsPos.length).toEqual(15);
  expect(Math.max(...bombsPos) <= planSize).toEqual(true);
  expect(new Set(bombsPos).size).toEqual(bombsPos.length);
});

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

test('CreateGrid should.. well.. create a grid', () => {
  const grid = CreateGrid(8, 12, 50);
  expect(grid.width).toEqual(8);
  expect(grid.height).toEqual(12);
  expect(grid.bombs).toEqual(50);
  expect(grid.flags).toEqual(0);
  expect(grid.emptyCellsTotal).toEqual(46);
  expect(grid.emptyCellsRemaining).toEqual(46);
  expect(grid.cells.length).toEqual(8 * 12);
});
