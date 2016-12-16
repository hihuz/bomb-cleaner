import CreateCell from './CellFactory';

test('CreateCell should create a cell with specified arguments', () => {
  const cell = CreateCell(2, '1');
  expect(cell).toEqual({ index: 2, isBomb: false, flagged: false, opened: false, value: '1' });
});

test('value X should set the cell as a bomb', () => {
  const cell = CreateCell(9, 'X');
  expect(cell).toEqual({ index: 9, isBomb: true, flagged: false, opened: false, value: 'X' });
});
