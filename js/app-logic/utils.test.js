import { getNeighbors, splitPlan, countBombs } from './utils';

test('getNeighbors should return an array of length 8', () => {
  const plan = ['X10',
    '110',
    '000'];
  const neighbors = getNeighbors(1, 1, plan);
  expect(neighbors.length).toEqual(8);
});

test('neighbors out of plan should be undefined', () => {
  const plan = ['X10',
    '110',
    '000'];
  const neighbors = getNeighbors(1, 0, plan);
  expect(neighbors).toEqual([undefined, undefined, undefined, 'X', '0', '1', '1', '0']);
});

test('neighbors should match the given plan', () => {
  const plan = ['X10',
    '110',
    '000'];
  const neighbors = getNeighbors(1, 1, plan);
  expect(neighbors).toEqual(['X', '1', '0', '1', '0', '0', '0', '0']);
});

test('neighbors should match the given plan 2', () => {
  const plan = [
    'X1X2X3',
    '4X56X7',
    '89XaXX',
    'bXcXde',
    'XXfgXh'
  ];
  const neighbors = getNeighbors(0, 1, plan);
  expect(neighbors).toEqual([undefined, 'X', '1', undefined, 'X', undefined, '8', '9']);
});

test('splitPlan should split a plan duh', () => {
  const plan = [
    'X10',
    '110',
    '000'
    ];
  const split = splitPlan(plan);
  expect(split).toEqual(['X', '1', '0', '1', '1', '0', '0', '0', '0']);
});

test('splitPlan should split a plan duh 2', () => {
  const plan = [
    '01234',
    '56789',
    'abcde',
    'fghij'
    ];
  const split = splitPlan(plan);
  expect(split).toEqual(['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j']);
});


test('countBombs should return 2 if there are 2 bombs, O RLY?', () => {
  const neighbors1 = ['X', '1', '0', '1', '0', 'X', '0', '0'];
  expect(countBombs(neighbors1)).toEqual(2);
});

test('countBombs should return 0 if there are 0 bombs, correct?', () => {
  const neighbors2 = ['0', '0', '0', '0', '0', '0', '0', '0'];
  expect(countBombs(neighbors2)).toEqual(0);
});

test('countBombs should return 0 with an array of undefined', () => {
  const neighbors3 = [
    undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined
  ];
  expect(countBombs(neighbors3)).toEqual(0);
});

test('countBombs should return 1 with a mixed array of undefined, 1 bomb and other values', () => {
  const neighbors4 = [undefined, undefined, 'X', undefined, '1', undefined, undefined, undefined];
  expect(countBombs(neighbors4)).toEqual(1);
});

test('countBombs should return the number of bombs no matter the length of the input array', () => {
  const neighbors5 = ['X', 'X', 'X'];
  expect(countBombs(neighbors5)).toEqual(3);
});

test('countBombs should return 0 when fed undefined', () => {
  expect(countBombs(undefined)).toEqual(0);
});

test('countBombs should return 0 when fed something other than an array', () => {
  expect(countBombs(1)).toEqual(0);
  expect(countBombs('grow a nub')).toEqual(0);
  expect(countBombs(() => { })).toEqual(0);
  expect(countBombs({ hey: 'ho', lets: 'go' })).toEqual(0);
});
