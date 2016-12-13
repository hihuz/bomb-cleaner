import GridFactory, { generateCells, generatePlan } from './GridFactory';
import CellFactory from './CellFactory';
import { countBombs, splitPlan } from './utils';

test('generateCells should generate cells based off a given plan', () => {
  const plan = ["X10",
                "110",
                "000"];
  const cells = [CellFactory(0, 0, "X"),
                 CellFactory(1, 0, "1"),
                 CellFactory(2, 0, "0"),
                 CellFactory(0, 1, "1"),
                 CellFactory(1, 1, "1"),
                 CellFactory(2, 1, "0"),
                 CellFactory(0, 2, "0"),
                 CellFactory(1, 2, "0"),
                 CellFactory(2, 2, "0")];

  expect(generateCells(plan)).toEqual(cells);
});

test('generatePlan should generate a random plan based off params', () => {
  const plan = generatePlan(10, 12, 5);
  const split = splitPlan(plan);
  expect(plan[0].length).toEqual(10);
  expect(plan.length).toEqual(12);
  expect(countBombs(split)).toEqual(5);
});
