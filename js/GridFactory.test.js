import GridFactory, { countBombs, generateCells, generatePlan } from './GridFactory';
import CellFactory from './CellFactory';

test('countBombs should return the number of bombs in the array', () => {
  const neighbors1 = ["X","1","0","1","0","X","0","0"];
  const neighbors2 = ["0","0","0","0","0","0","0","0"];
  const neighbors3 = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
  const neighbors4 = [undefined,undefined,"X",undefined,"1",undefined,undefined,undefined];
  const neighbors5 = ["X","X","X"];
  expect(countBombs(neighbors1)).toEqual(2);
  expect(countBombs(neighbors2)).toEqual(0);
  expect(countBombs(neighbors3)).toEqual(0);
  expect(countBombs(neighbors4)).toEqual(1);
  expect(countBombs(neighbors5)).toEqual(3);
});

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

  expect(plan[0].length).toEqual(10);
  expect(plan.length).toEqual(12);
  expect(countBombs(plan)).toEqual(5);
});
