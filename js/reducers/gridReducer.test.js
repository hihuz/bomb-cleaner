import gridReducer from './gridReducer';
import CreateGrid from '../app-logic/GridFactory';
import CreateCell from '../app-logic/CellFactory';
import { openCell, openBomb, toggleFlag, initGame, resetGame, setMode, addHighScore } from '../actions/actionCreators'

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

test('OPEN_CELL: should return the grid passed in the action', () => {
  const stateBefore = Object.freeze(MakeTestGrid(0, 'hidden', false));
  const action = openCell(0, stateBefore);
  expect(gridReducer(stateBefore, action)).toEqual(action.grid);
});

test('OPEN_BOMB: should return the grid passed in the action', () => {
  const stateBefore = Object.freeze(MakeTestGrid(0, 'hidden', true));
  const action = openBomb(0, stateBefore);
  expect(gridReducer(stateBefore, action)).toEqual(action.grid);
});

test('TOGGLE_FLAG: should return the grid passed in the action', () => {
  const stateBefore = Object.freeze(MakeTestGrid(0, 'hidden', true));
  const action = toggleFlag(0, stateBefore);
  expect(gridReducer(stateBefore, action)).toEqual(action.grid);
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
