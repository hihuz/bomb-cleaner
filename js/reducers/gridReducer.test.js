import gridReducer from './gridReducer';
import CreateGrid from '../app-logic/GridFactory';

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

test('OPEN_BOMB_CELL : write the test for this', () => {
  expect(1).toEqual(0);
});

test('OPEN_EMPTY_CELL : write the test for this', () => {
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
