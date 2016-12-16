import gridReducer from './gridReducer';

function MakeTestGrid(flags = 0, cellState = 'hidden', isBomb = false, empty = 2) {
  const grid = {
    width: 1,
    height: 1,
    bombs: isBomb ? 1 : 0,
    flags,
    emptyCellsRemaining: empty,
    plan: [' '],
    cells: [
      {
        index: 0,
        isBomb,
        flagged: cellState == 'flagged',
        opened: cellState == 'opened',
        value: isBomb ? 'X' : '0'
      }
    ]
  };

  return grid;
}

test('OPEN_NUMBER_CELL : left click on a hidden cell should update its state to opened and decrement emptyCellsRemaining', () => {
  const stateBefore = Object.freeze(MakeTestGrid(0, 'hidden', false));
  const stateAfter = Object.assign({}, stateBefore, { emptyCellsRemaining: 1 },
    { cells: [{
      index: 0,
      isBomb: false,
      flagged: false,
      opened: true,
      value: '0'
    }]
    }
  );
  const action = Object.freeze({
    type: 'OPEN_NUMBER_CELL',
    index: 0
  });

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
});

test('TOGGLE_FLAG : flagged should be updated, decrement the flag count', () => {
  const stateBefore = Object.freeze(MakeTestGrid(1, 'flagged', false));
  const stateAfter = Object.assign({}, stateBefore, { flags: 0 },
    { cells: [{
      index: 0,
      isBomb: false,
      flagged: false,
      opened: false,
      value: '0'
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
      value: '0'
    }]
    }
  );
  const action = Object.freeze({
    type: 'TOGGLE_FLAG',
    index: 0
  });

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
});

test('RESET_GAME : the reducer should make the passed grid the new state grid', () => {
  const newGrid = {
    width: 5,
    height: 5,
    bombs: 5,
    flags: 0,
    emptyCellsTotal: 20,
    emptyCellsRemaining: 20,
    plan: [' X   ',
      '  X  ',
      '   X ',
      '  X  ',
      ' X   '],
    cells: []
  };
  const action = {
    type: 'RESET_GAME',
    grid: newGrid
  };
  const stateBefore = Object.freeze({});
  const stateAfter = newGrid;

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
});
