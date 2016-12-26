import { getNeighbors, countBombs, getIndexesToOpen } from './utils';
import CreateCell from './CellFactory';
import { fillCellsValues } from './GridFactory';

test('getNeighbors should return an array of length 8', () => {
  const width = 8;
  const height = 10;
  const cells = new Array(width * height)
  .fill(undefined)
  .map((cell, i) => i);
  const neighbors = getNeighbors(0, cells, width);
  expect(neighbors.length).toEqual(8);
});

test('neighbors out of plan should be undefined', () => {
  const width = 8;
  const height = 10;
  const cells = new Array(width * height)
  .fill(undefined)
  .map((cell, i) => i);
  const neighbors = getNeighbors(1, cells, width);
  expect(neighbors).toEqual([undefined, undefined, undefined, 0, 2, 8, 9, 10]);
});

/* the plan used for the 3 tests below looks like this :
[
'00','01','02','03','04','05','06','07','08',
'09','10','11','12','13','14','15','16','17',
'18','19','20','21','22','23','24','25','26',
'27','28','29','30','31','32','33','34','35',
'36','37','38','39','40','41','42','43','44',
'45','46','47','48','49','50','51','52','53',
'54','55','56','57','58','59','60','61','62',
'63','64','65','66','67','68','69','70','71',
'72','73','74','75','76','77','78','79','80',
'81','82','83','84','85','86','87','88','89',
'90','91','92','93','94','95','96','97','98',
'99','100','101','102','103','104','105','106','107'
]
*/
test('neighbors should match the given plan', () => {
  const width = 9;
  const height = 12;
  const cells = new Array(width * height)
  .fill(undefined)
  .map((cell, i) => i);
  const neighbors = getNeighbors(25, cells, width);
  expect(neighbors).toEqual([15, 16, 17, 24, 26, 33, 34, 35]);
});

test('neighbors should match the given plan 2', () => {
  const width = 9;
  const height = 12;
  const cells = new Array(width * height)
  .fill(undefined)
  .map((cell, i) => i);
  const neighbors = getNeighbors(54, cells, width);
  expect(neighbors).toEqual([undefined, 45, 46, undefined, 55, undefined, 63, 64]);
});

test('neighbors should match the given plan 3', () => {
  const width = 9;
  const height = 12;
  const cells = new Array(width * height)
  .fill(undefined)
  .map((cell, i) => i);
  const neighbors = getNeighbors(101, cells, width);
  expect(neighbors).toEqual([91, 92, 93, 100, 102, undefined, undefined, undefined]);
});

test('countBombs should return 2 if there are 2 bombs, O RLY?', () => {
  const neighbors = ['X', '1', '0', '1', '0', 'X', '0', '0']
  .map(item => ({ value: item }));
  expect(countBombs(neighbors)).toEqual(2);
});

test('countBombs should return 0 if there are 0 bombs, correct?', () => {
  const neighbors = ['0', '0', '0', '0', '0', '0', '0', '0']
  .map(item => ({ value: item }));
  expect(countBombs(neighbors)).toEqual(0);
});

test('countBombs should return 0 with an array of undefined', () => {
  const neighbors = [
    undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined
  ]
  .map(item => ({ value: item }));
  expect(countBombs(neighbors)).toEqual(0);
});

test('countBombs should return 1 with a mixed array of undefined, 1 bomb and other values', () => {
  const neighbors = [undefined, undefined, 'X', undefined, '1', undefined, undefined, undefined]
  .map(item => ({ value: item }));
  expect(countBombs(neighbors)).toEqual(1);
});

test('countBombs should return the number of bombs no matter the length of the input array', () => {
  const neighbors = ['X', 'X', 'X']
  .map(item => ({ value: item }));
  expect(countBombs(neighbors)).toEqual(3);
});

test('countBombs should return 0 when fed undefined', () => {
  expect(countBombs(undefined)).toEqual(0);
});

test('countBombs should return 0 when fed something other than an array of objects w/ a value prop', () => {
  expect(countBombs(1)).toEqual(0);
  expect(countBombs('grow a nub')).toEqual(0);
  expect(countBombs(() => { })).toEqual(0);
  expect(countBombs({ hey: 'ho', lets: 'go' })).toEqual(0);
});


test('getIndexesToOpen should return an array of indexes which can be safely open starting from a specific index', () => {
  const plan = [
    'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ',
    ' ', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ',
    ' ', ' ', 'X', ' ', 'X', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', 'X', ' ', 'X', 'X', ' ', ' ', ' ',
    ' ', 'X', ' ', ' ', ' ', ' ', 'X', ' ', ' ',
    'X', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' ',
    ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', 'X',
    ' ', ' ', 'X', ' ', ' ', ' ', ' ', 'X', ' ',
    ' ', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ',
    ' ', ' ', ' ', ' ', 'X', 'X', ' ', ' ', ' '
  ].map((cell, i) => CreateCell(i, cell));
  const cells = fillCellsValues(plan, 9);
  expect(getIndexesToOpen(1, cells, 9)).toEqual([1]);
  expect(getIndexesToOpen(3, cells, 9).sort((a, b) => a - b)).toEqual([2, 3, 4, 11, 12, 13]);
  expect(getIndexesToOpen(58, cells, 9).sort((a, b) => a - b)).toEqual([
    47, 48, 49, 50, 56, 57, 58, 59, 60, 65, 66, 67, 68, 69, 75, 76, 77, 78
  ]);
});
