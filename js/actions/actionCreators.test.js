import CreateGrid, { fillGrid } from '../app-logic/GridFactory';
import CreateCell from '../app-logic/CellFactory';
import { openCell, openBomb, toggleFlag, resetGame, initGame, setMode, addHighScore } from './actionCreators';
import { OPEN_CELL, OPEN_BOMB, TOGGLE_FLAG, ADD_HS } from './actionTypes';

function MakeTestGrid(flags = 0, cellState = 'hidden', isBomb = false, empty = 2) {
  const grid = {
    width: 1,
    height: 1,
    bombs: isBomb ? 1 : 0,
    flags,
    emptyCellsRemaining: empty,
    cells: [
      {
        index: 0,
        isBomb,
        flagged: cellState === 'flagged',
        opened: cellState === 'opened',
        value: isBomb ? 'X' : ' '
      }
    ]
  };

  return grid;
}

function MakeHS(name, time, date) {
  return { name, time, date };
}

test('openCell: should return an OPEN_CELL action with passed index opened and decremented empty count', () => {
  const gridBefore = Object.freeze(MakeTestGrid(0, 'hidden', false));
  const gridAfter = Object.assign({}, gridBefore, { emptyCellsRemaining: 1 },
    { cells: [{
      index: 0,
      isBomb: false,
      flagged: false,
      opened: true,
      value: ' '
    }]
    }
  );
  const actual = openCell(0, gridBefore);
  const expectedAction = Object.freeze({ type: OPEN_CELL, grid: gridAfter });

  expect(actual).toEqual(expectedAction);
});


test('openCell: opening a cell should propagate to neighbors if empty', () => {
  const gridBefore = Object.freeze({
    width: 4,
    height: 4,
    bombs: 2,
    flags: 0,
    emptyCellsRemaining: 13,
    cells: [
      CreateCell(0, 'X'),
      CreateCell(1, 3),
      CreateCell(2, 1),
      CreateCell(3, ' '),
      CreateCell(4, 'X'),
      CreateCell(5, 'X'),
      CreateCell(6, 1),
      CreateCell(7, ' '),
      CreateCell(8, 2),
      CreateCell(9, 2),
      CreateCell(10, 1),
      CreateCell(11, ' '),
      CreateCell(12, ' '),
      CreateCell(13, ' '),
      CreateCell(14, ' '),
      CreateCell(15, ' ')
    ]
  });
  // opening all cells with 1 / 2 or empty makes sense in this test case
  // because the grid looks like this:
  // X31_
  // XX1_
  // 221_
  // ____
  // and the tested index is the top right cell
  const cellsAfter = gridBefore.cells.map((cell) => {
    let updatedCell;
    if (cell.value === ' ' || cell.value === 2 || cell.value === 1) {
      updatedCell = Object.assign({}, cell, { opened: true });
    } else { updatedCell = Object.assign({}, cell); }
    return updatedCell;
  });
  const gridAfter = Object.assign(
    {},
    gridBefore,
    { emptyCellsRemaining: 1 },
    { cells: cellsAfter }
  );
  const actual = openCell(3, gridBefore);
  const expectedAction = Object.freeze({ type: OPEN_CELL, grid: gridAfter });

  expect(actual).toEqual(expectedAction);
});

test('openBomb: should return an OPEN_BOMB action with all bomb shown', () => {
  const gridBefore = Object.freeze({
    width: 4,
    height: 4,
    bombs: 2,
    flags: 0,
    emptyCellsRemaining: 13,
    cells: [
      CreateCell(0, 'X'),
      CreateCell(1, 3),
      CreateCell(2, 1),
      CreateCell(3, ' '),
      CreateCell(4, 'X'),
      CreateCell(5, 'X'),
      CreateCell(6, 1),
      CreateCell(7, ' '),
      CreateCell(8, 2),
      CreateCell(9, 2),
      CreateCell(10, 1),
      CreateCell(11, ' '),
      CreateCell(12, ' '),
      CreateCell(13, ' '),
      CreateCell(14, ' '),
      CreateCell(15, ' ')
    ]
  });
  const cellsAfter = gridBefore.cells.map((cell) => {
    let updatedCell;
    if (cell.value === 'X') {
      updatedCell = Object.assign({}, cell, { opened: true });
    } else { updatedCell = Object.assign({}, cell); }
    return updatedCell;
  });
  const gridAfter = Object.assign(
    {},
    gridBefore,
    { emptyCellsRemaining: 13 },
    { cells: cellsAfter }
  );
  const expectedAction = Object.freeze({ type: OPEN_BOMB, grid: gridAfter });

  expect(openBomb(5, gridBefore)).toEqual(expectedAction);
});

test('toggleFlag: should return an TOGGLE_FLAG action with the passed index flag toggled', () => {
  const gridBefore = Object.freeze(MakeTestGrid(1, 'flagged', false));
  const gridAfter = Object.assign({}, gridBefore, { flags: 0 },
    { cells: [{
      index: 0,
      isBomb: false,
      flagged: false,
      opened: false,
      value: ' '
    }]
    }
  );
  const expectedAction = Object.freeze({ type: TOGGLE_FLAG, grid: gridAfter });

  expect(toggleFlag(0, gridBefore)).toEqual(expectedAction);
});

test('toggleFlag: should return an TOGGLE_FLAG action with the passed index flag toggled 2', () => {
  const gridBefore = Object.freeze(MakeTestGrid(0, 'hidden', false));
  const gridAfter = Object.assign({}, gridBefore, { flags: 1 },
    { cells: [{
      index: 0,
      isBomb: false,
      flagged: true,
      opened: false,
      value: ' '
    }]
    }
  );
  const expectedAction = Object.freeze({ type: TOGGLE_FLAG, grid: gridAfter });

  expect(toggleFlag(0, gridBefore)).toEqual(expectedAction);
});

test('setMode (easy): should return an SET_MODE action with a fresh grid of specified mode/props', () => {
  const action = setMode('easy');

  expect(action.grid.bombs).toEqual(10);
  expect(action.grid.width).toEqual(9);
  expect(action.grid.height).toEqual(9);
  expect(action.grid.flags).toEqual(0);
  expect(action.grid.emptyCellsRemaining).toEqual((9 * 9) - 10);
  expect(action.type).toEqual('SET_MODE');
  expect(action.mode).toEqual('easy');
});

test('setMode (medium): should return an SET_MODE action with a fresh grid of specified mode/props', () => {
  const action = setMode('medium');

  expect(action.grid.bombs).toEqual(40);
  expect(action.grid.width).toEqual(16);
  expect(action.grid.height).toEqual(16);
  expect(action.grid.flags).toEqual(0);
  expect(action.grid.emptyCellsRemaining).toEqual((16 * 16) - 40);
  expect(action.type).toEqual('SET_MODE');
  expect(action.mode).toEqual('medium');
});

test('setMode (hard): should return an SET_MODE action with a fresh grid of specified mode/props', () => {
  const action = setMode('hard');

  expect(action.grid.bombs).toEqual(99);
  expect(action.grid.width).toEqual(30);
  expect(action.grid.height).toEqual(16);
  expect(action.grid.flags).toEqual(0);
  expect(action.grid.emptyCellsRemaining).toEqual((30 * 16) - 99);
  expect(action.type).toEqual('SET_MODE');
  expect(action.mode).toEqual('hard');
});

test('setMode (custom): should return an SET_MODE action with a fresh grid of specified mode/props', () => {
  const action = setMode('custom', 14, 17, 38);

  expect(action.grid.bombs).toEqual(38);
  expect(action.grid.width).toEqual(14);
  expect(action.grid.height).toEqual(17);
  expect(action.grid.flags).toEqual(0);
  expect(action.grid.emptyCellsRemaining).toEqual((14 * 17) - 38);
  expect(action.type).toEqual('SET_MODE');
  expect(action.mode).toEqual('custom');
});

test('initGame: takes an index and an empty grid, should return a filled grid with index opened', () => {
  const gridBefore = Object.freeze({
    width: 4,
    height: 4,
    bombs: 5,
    flags: 0,
    emptyCellsRemaining: 11,
    cells: [
      { index: 0 },
      { index: 1 },
      { index: 2 },
      { index: 3 },
      { index: 4 },
      { index: 5 },
      { index: 6 },
      { index: 7 },
      { index: 8 },
      { index: 9 },
      { index: 10 },
      { index: 11 },
      { index: 12 },
      { index: 13 },
      { index: 14 },
      { index: 15 }
    ]
  });
  const action = initGame(5, gridBefore);

  expect(action.type).toEqual('OPEN_CELL');
  expect(action.grid.bombs).toEqual(5);
  expect(action.grid.cells.filter(cell => cell.value === 'X').length).toEqual(5);
  expect(action.grid.flags).toEqual(0);
  expect(action.grid.emptyCellsRemaining).toBeLessThan(11);
  expect(action.grid.cells[5].value).not.toEqual('X');
});

test('resetGame: should return an RESET_GAME action with a fresh grid of same props', () => {
  const gridBefore = Object.freeze(fillGrid(0, CreateGrid(10, 12, 30)));
  const action = resetGame(gridBefore);

  expect(action.grid.bombs).toEqual(gridBefore.bombs);
  expect(action.grid.width).toEqual(gridBefore.width);
  expect(action.grid.height).toEqual(gridBefore.height);
  expect(action.grid.flags).toEqual(0);
  expect(action.grid.emptyCellsRemaining).toEqual((10 * 12) - 30);
  expect(action.type).toEqual('RESET_GAME');
});

test('addHighScore (empty): should return an ADD_HS action with an updated highscores object', () => {
  const HSBefore = { easy: [], medium: [], hard: [] };
  const HSAfter = { easy: [MakeHS('Mel', 12, '2016-12-20')], medium: [], hard: [] };
  const action = Object.freeze({ type: ADD_HS, highScores: HSAfter });

  expect(addHighScore('easy', 'Mel', 12, '2016-12-20', HSBefore)).toEqual(action);
});

test('addHighScore (add last, not full): should return an ADD_HS action with an updated highscores object', () => {
  const HSBefore = {
    easy: ['boo'],
    medium: ['bah'],
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13')
    ] };
  const HSAfter = Object.assign({}, HSBefore, {
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('Typhon', 77, '2016-02-16')
    ]
  });
  const action = Object.freeze({ type: ADD_HS, highScores: HSAfter });

  expect(addHighScore('hard', 'Typhon', 77, '2016-02-16', HSBefore)).toEqual(action);
});

test('addHighScore (add last, already full): should return an ADD_HS action with an updated highscores object', () => {
  const HSBefore = {
    easy: ['boo'],
    medium: ['bah'],
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('Bert', 92, '2016-04-15'),
      MakeHS('Dan', 106, '2016-03-16')
    ] };
  const HSAfter = Object.assign({}, HSBefore, {
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('Bert', 92, '2016-04-15'),
      MakeHS('sb', 98, '2016-12-08')
    ]
  });
  const action = Object.freeze({ type: ADD_HS, highScores: HSAfter });

  expect(addHighScore('hard', 'sb', 98, '2016-12-08', HSBefore)).toEqual(action);
});

test('addHighScore (add inside, not full): should return an ADD_HS action with an updated highscores object', () => {
  const HSBefore = {
    easy: ['boo'],
    medium: ['bah'],
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13')
    ] };
  const HSAfter = Object.assign({}, HSBefore, {
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Typhon', 75, '2016-02-16'),
      MakeHS('Sara', 76, '2016-07-13')
    ]
  });
  const action = Object.freeze({ type: ADD_HS, highScores: HSAfter });

  expect(addHighScore('hard', 'Typhon', 75, '2016-02-16', HSBefore)).toEqual(action);
});

test('addHighScore (add inside, already full): should return an ADD_HS action with an updated highscores object', () => {
  const HSBefore = {
    easy: ['boo'],
    medium: ['bah'],
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('Bert', 92, '2016-04-15'),
      MakeHS('Dan', 106, '2016-03-16')
    ] };
  const HSAfter = Object.assign({}, HSBefore, {
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('sb', 86, '2016-12-08'),
      MakeHS('Bert', 92, '2016-04-15')
    ]
  });
  const action = Object.freeze({ type: ADD_HS, highScores: HSAfter });

  expect(addHighScore('hard', 'sb', 86, '2016-12-08', HSBefore)).toEqual(action);
});

test('addHighScore (add first, not full): should return an ADD_HS action with an updated highscores object', () => {
  const HSBefore = {
    easy: ['boo'],
    medium: ['bah'],
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('Bert', 92, '2016-04-15')
    ] };
  const HSAfter = Object.assign({}, HSBefore, {
    hard: [
      MakeHS('sb', 32, '2016-12-08'),
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('Bert', 92, '2016-04-15')
    ]
  });
  const action = Object.freeze({ type: ADD_HS, highScores: HSAfter });

  expect(addHighScore('hard', 'sb', 32, '2016-12-08', HSBefore)).toEqual(action);
});


test('addHighScore (add first, already full): should return an ADD_HS action with an updated highscores object', () => {
  const HSBefore = {
    easy: ['boo'],
    medium: ['bah'],
    hard: [
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('Bert', 92, '2016-04-15'),
      MakeHS('Dan', 106, '2016-03-16')
    ] };
  const HSAfter = Object.assign({}, HSBefore, {
    hard: [
      MakeHS('sb', 32, '2016-12-08'),
      MakeHS('Bob', 46, '2016-10-11'),
      MakeHS('John', 52, '2016-08-12'),
      MakeHS('Sara', 76, '2016-07-13'),
      MakeHS('Bert', 92, '2016-04-15')
    ]
  });
  const action = Object.freeze({ type: ADD_HS, highScores: HSAfter });

  expect(addHighScore('hard', 'sb', 32, '2016-12-08', HSBefore)).toEqual(action);
});
