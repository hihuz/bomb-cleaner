import gridReducer from './grid';

function MakeTestGrid(flags = 0, cellState = 'hidden', isBomb = false, empty = 2) {
  const grid = {
    width: 1,
    height: 1,
    bombs: isBomb ? 1 : 0,
    flags,
    emptyCellsTotal: empty,
    emptyCellsRemaining: empty,
    plan: [' '],
    cells: [
      {
        pos: {
          x: 0,
          y: 0
        },
        isBomb,
        value: isBomb ? 'X' : '0',
        cellState
      }
    ]
  };

  return grid;
}

test('CELL_LEFT_CLICK : left click on a hidden cell should update its state to opened and decrement emptyCellsRemaining', () => {
  const stateBefore = Object.freeze(MakeTestGrid(0, 'hidden', false));
  const stateAfter = Object.assign({}, stateBefore, { emptyCellsRemaining: 1 },
    { cells: [{
      pos: {
        x: 0,
        y: 0
      },
      isBomb: false,
      value: '0',
      cellState: 'opened'
    }]
    }
  );
  const action = Object.freeze({
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  });

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
});

test('CELL_RIGHT_CLICK : a flagged cell should have a new state of hidden, decrement the flag count', () => {
  const stateBefore = Object.freeze(MakeTestGrid(1, 'flagged', false));
  const stateAfter = Object.assign({}, stateBefore, { flags: 0 },
    { cells: [{
      pos: {
        x: 0,
        y: 0
      },
      isBomb: false,
      value: '0',
      cellState: 'hidden'
    }]
    }
  );
  const action = Object.freeze({
    type: 'CELL_RIGHT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  });

  expect(gridReducer(stateBefore, action)).toEqual(stateAfter);
});

test('CELL_RIGHT_CLICK : a hidden cell should have a new state of flagged, increment the flag count', () => {
  const stateBefore = Object.freeze(MakeTestGrid(0, 'hidden', false));
  const stateAfter = Object.assign({}, stateBefore, { flags: 1 },
    { cells: [{
      pos: {
        x: 0,
        y: 0
      },
      isBomb: false,
      value: '0',
      cellState: 'flagged'
    }]
    }
  );
  const action = Object.freeze({
    type: 'CELL_RIGHT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
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
