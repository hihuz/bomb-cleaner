import gridReducer from './gridReducer';
import CreateGrid from '../app-logic/GridFactory';
import CreateCell from '../app-logic/CellFactory';

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
        flagged: cellState == 'flagged',
        opened: cellState == 'opened',
        value: isBomb ? 'X' : ' '
      }
    ]
  };

  return grid;
}

test('OPEN_CELL : left click on a hidden cell should update its state to opened and decrement emptyCellsRemaining', () => {
  const stateBefore = Object.freeze(MakeTestGrid(0, 'hidden', false));
  const stateAfter = Object.assign({}, stateBefore, { emptyCellsRemaining: 1 },
    { cells: [{
      index: 0,
      isBomb: false,
      flagged: false,
      opened: true,
      value: ' '
    }]
    }
  );
  const action = Object.freeze({
    type: 'OPEN_CELL',
    index: 0
  });

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
});

test('OPEN_CELL: left click should propagate to neighbors if empty', () => {
  const stateBefore = Object.freeze({
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
  const cellsAfter = stateBefore.cells.map((cell) => {
    let updatedCell;
    if (cell.value === ' ' || cell.value === 2 || cell.value === 1) {
      updatedCell = Object.assign({}, cell, { opened: true });
    }
    else { updatedCell = Object.assign({}, cell); }
    return updatedCell;
  });
  const stateAfter = Object.assign(
    {},
    stateBefore,
    { emptyCellsRemaining: 1 },
    { cells: cellsAfter }
  );

  const action = Object.freeze({
    type: 'OPEN_CELL',
    index: 3
  });

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
})

test('OPEN_BOMB : write the test for this', () => {
  expect(1).toEqual(0);
});

test('TOGGLE_FLAG : flagged should be updated, decrement the flag count', () => {
  const stateBefore = Object.freeze(MakeTestGrid(1, 'flagged', false));
  const stateAfter = Object.assign({}, stateBefore, { flags: 0 },
    { cells: [{
      index: 0,
      isBomb: false,
      flagged: false,
      opened: false,
      value: ' '
    }]
    }
  );
  const action = Object.freeze({
    type: 'TOGGLE_FLAG',
    index: 0
  });

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
});

test('TOGGLE_FLAG : flagged should be updated, increment the flag count', () => {
  const stateBefore = Object.freeze(MakeTestGrid(0, 'hidden', false));
  const stateAfter = Object.assign({}, stateBefore, { flags: 1 },
    { cells: [{
      index: 0,
      isBomb: false,
      flagged: true,
      opened: false,
      value: ' '
    }]
    }
  );
  const action = Object.freeze({
    type: 'TOGGLE_FLAG',
    index: 0
  });

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
});

test('RESET_GAME : should provide a new fresh grid to the state', () => {
  const state = Object.freeze(CreateGrid(10, 12, 30));
  const action = Object.freeze({
    type: 'RESET_GAME',
    grid: CreateGrid(10, 12, 30)
  });
  const nextState = gridReducer(state, action);

  expect(nextState.bombs).toEqual(state.bombs);
  expect(nextState.width).toEqual(state.width);
  expect(nextState.height).toEqual(state.height);
  expect(nextState.flags).toEqual(0);
  expect(nextState.emptyCellsRemaining).toEqual(10 * 12 - 30);
});
