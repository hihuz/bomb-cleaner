/* there is something fishy going on here, i had a test fail once here and once again in a dependency,
CHECK IT OUT
GENERATE PLAN SEEMS TO BE THE ISSUE ????. ? .?. ???
IT PASSES SOMETIMES, BUT SOMTIMES IT FAILS WITH recieved 11, expected 10

sometimes reducers.test.js fails to run

sometimes all pass... wtf ?
!!!!!!!!!!!!!!
*/
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
  const plan = generatePlan(10, 12, 15);
  const split = splitPlan(plan);
  plan.forEach(function(line) {
    expect(line.length).toEqual(10);
  });
  expect(plan.length).toEqual(12);
  expect(countBombs(split)).toEqual(15);
});
