import reducers from './reducers';

function MakeTestGrid(flags = 0, cellState = 'hidden', isBomb = false, empty = 2) {
  const grid = {
    width: 1,
    height: 1,
    bombs: isBomb ? 1 : 0,
    flags: flags,
    emptyCellsTotal: empty,
    emptyCellsRemaining: empty,
    plan: [' '],
    cells: [
      {
        pos: {
          x: 0,
          y: 0
        },
        isBomb: isBomb,
        value: isBomb ? "X" : "0",
        cellState: cellState
      }
    ]
  };

  return grid;
}

/************* LEFT CLICK TESTS *************/
test('CELL_LEFT_CLICK : first left click should set the game status to running', () => {
  const grid = MakeTestGrid(0, 'hidden', false);
  const action = {
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'init'
  };
  const stateAfter = {
    grid: grid,
    gameStatus: 'running'
  };

  expect(reducers(stateBefore, action).gameStatus).toEqual(stateAfter.gameStatus);
});

test('CELL_LEFT_CLICK : left click on a hidden cell should update its state to opened and decrement emptyCellsRemaining', () => {
  const grid = MakeTestGrid(0, 'hidden', false);
  const gridAfter = Object.assign({}, grid, { emptyCellsRemaining: 1 },
    { cells: [ {
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
  const action = {
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'running'
  };
  const stateAfter = {
    grid: gridAfter,
    gameStatus: 'running'
  };

  expect(reducers(stateBefore, action)).toEqual(stateAfter);
});

test('CELL_LEFT_CLICK : left click on the last "empty" cell should win the game', () => {
  const grid = MakeTestGrid(0, 'hidden', false, 1);
  const gridAfter = Object.assign({}, grid, { emptyCellsRemaining: 0 },
    { cells: [ {
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
  const action = {
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'running'
  };
  const stateAfter = {
    grid: gridAfter,
    gameStatus: 'won'
  };

  expect(reducers(stateBefore, action)).toEqual(stateAfter);
});

test('CELL_LEFT_CLICK : left click on a bomb should lose the game', () => {
  const grid = MakeTestGrid(0, 'hidden', true, 2);
  const gridAfter = Object.assign({}, grid,
    { cells: [ {
        pos: {
          x: 0,
          y: 0
        },
        isBomb: true,
        value: 'X',
        cellState: 'opened'
      }]
    }
  );
  const action = {
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'running'
  };
  const stateAfter = {
    grid: gridAfter,
    gameStatus: 'lost'
  };

  expect(reducers(stateBefore, action)).toEqual(stateAfter);
});

test('CELL_LEFT_CLICK : left click on an already opened cell should have no effect', () => {
  const grid = MakeTestGrid(0, 'opened', false, 2);
  const action = {
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'running'
  };

  expect(reducers(stateBefore, action)).toEqual(stateBefore);
});

test('CELL_LEFT_CLICK : left click on a flagged cell should have no effect, even if it is a bomb', () => {
  const grid = MakeTestGrid(0, 'flagged', true, 2);
  const action = {
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'running'
  };

  expect(reducers(stateBefore, action)).toEqual(stateBefore);
});

test('CELL_LEFT_CLICK : left click when the game is lost should have no effect', () => {
  const grid = MakeTestGrid(0, 'flagged', true, 2);
  const action = {
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'lost'
  };

  expect(reducers(stateBefore, action)).toEqual(stateBefore);
});

test('CELL_LEFT_CLICK : left click when the game is won should have no effect', () => {
  const grid = MakeTestGrid(0, 'flagged', true, 2);
  const action = {
    type: 'CELL_LEFT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'won'
  };

  expect(reducers(stateBefore, action)).toEqual(stateBefore);
});

/********* RIGHT CLICK TESTS **********/
test('CELL_RIGHT_CLICK : a flagged cell should have a new state of hidden, decrement the flag count', () => {
  const grid = MakeTestGrid(1, 'flagged', false);
  const gridAfter = Object.assign({}, grid, { flags: 0 },
    { cells: [ {
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
  const action = {
    type: 'CELL_RIGHT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'running'
  };
  const stateAfter = {
    grid: gridAfter,
    gameStatus: 'running'
  };

  expect(reducers(stateBefore, action)).toEqual(stateAfter);

});

test('CELL_RIGHT_CLICK : a hidden cell should have a new state of flagged, increment the flag count', () => {
  const grid = MakeTestGrid(0, 'hidden', false);
  const gridAfter = Object.assign({}, grid, { flags: 1 },
    { cells: [ {
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
  const action = {
    type: 'CELL_RIGHT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  };
  const stateBefore = {
    grid: grid,
    gameStatus: 'running'
  };
  const stateAfter = {
    grid: gridAfter,
    gameStatus: 'running'
  };

  expect(reducers(stateBefore, action)).toEqual(stateAfter);

});

test('CELL_RIGHT_CLICK : a right click on an opened cell should have no effect', () => {
  const grid = MakeTestGrid(0, 'opened', false);
  const action = {
    type: 'CELL_RIGHT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  }
  const state = {
    grid: grid,
    gameStatus: 'running'
  };

  expect(reducers(state, action)).toEqual(state);
});

test('CELL_RIGHT_CLICK : when the game is lost, the right click should have no effect', () => {
  const grid = MakeTestGrid(0, 'hidden', false);
  const action = {
    type: 'CELL_RIGHT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  }
  const state = {
    grid: grid,
    gameStatus: 'lost'
  };

  expect(reducers(state, action)).toEqual(state);
});

test('CELL_RIGHT_CLICK : when the game is won, the right click should have no effect', () => {
  const grid = MakeTestGrid(0, 'hidden', false);
  const action = {
    type: 'CELL_RIGHT_CLICK',
    cellPos: {
      x: 0,
      y: 0
    }
  }
  const state = {
    grid: grid,
    gameStatus: 'won'
  };

  expect(reducers(state, action)).toEqual(state);
});

/************ RESET GAME TESTS ***************/
test('RESET_GAME : the reducer should make the passed grid the new state grid, and reset the gameStatus', () => {
  const newGrid = {
    width: 5,
    height: 5,
    bombs: 5,
    flags: 0,
    emptyCellsTotal: 20,
    emptyCellsRemaining: 20,
    plan: [" X   ",
           "  X  ",
           "   X ",
           "  X  ",
           " X   "],
    cells: []
  };
  const action = {
    type: 'RESET_GAME',
    grid: newGrid
  };
  const stateBefore = {
    grid: {},
    gameStatus: 'running'
  };
  const stateAfter = {
    grid: newGrid,
    gameStatus: 'init'
  };

  expect(reducers(stateBefore, action)).toEqual(stateAfter);
});
