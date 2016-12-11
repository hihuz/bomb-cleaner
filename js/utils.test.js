import getNeighbors, { splitPlan } from './utils';
import CellFactory from './CellFactory';

test('getNeighbors should return an array of length 8', () => {
  const plan = ["X10",
                "110",
                "000"];
  const cell = CellFactory(1, 1, 1);
  const neighbors = getNeighbors(cell, plan);
  expect(neighbors.length).toEqual(8);
});

test('neighbors out of plan should be undefined', () => {
  const plan = ["X10",
                "110",
                "000"];
  const cell = CellFactory(1, 0, 1);
  const neighbors = getNeighbors(cell, plan);
  expect(neighbors).toEqual([undefined, undefined, undefined, "X", "0", "1", "1", "0"]);
});

test('neighbors should match the given plan', () => {
  const plan = ["X10",
                "110",
                "000"];
  const cell = CellFactory(1, 1, 1);
  const neighbors = getNeighbors(cell, plan);
  expect(neighbors).toEqual(["X","1","0","1","0","0","0","0"]);
});


test('splitPlan should split a plan duh', () => {
  const plan = ["X10",
                "110",
                "000"];
  const split = splitPlan(plan);
  expect(split).toEqual(["X","1","0","1","1","0","0","0","0"]);
});
