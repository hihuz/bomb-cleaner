import CreateCell from './CellFactory';

test('CreateCell should create a cell with specified arguments', () => {
  const cell = CreateCell(1, 1, '1');
  expect(cell).toEqual({ pos: { x: 1, y: 1 }, isBomb: false, value: '1', cellState: 'hidden' });
});

test('value X should set the cell as a bomb', () => {
  const cell = CreateCell(2, 6, 'X');
  expect(cell).toEqual({ pos: { x: 2, y: 6 }, isBomb: true, value: 'X', cellState: 'hidden' });
});
