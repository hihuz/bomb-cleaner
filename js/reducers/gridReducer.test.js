import gridReducer from './gridReducer';
import CreateGrid, { fillGrid } from '../app-logic/GridFactory';
import CreateCell from '../app-logic/CellFactory';
import { openCell, openBomb, toggleFlag, resetGame, setMode } from '../actions/actionCreators'

test('OPEN_CELL: should return the grid passed in the action', () => {
  const stateBefore = Object.freeze(fillGrid(0, CreateGrid(10, 10, 25)));
  const action = openCell(0, stateBefore);
  expect(gridReducer(stateBefore, action)).toEqual(action.grid);
});

test('OPEN_BOMB: should return the grid passed in the action', () => {
  const stateBefore = Object.freeze(fillGrid(10, CreateGrid(9, 9, 80)));
  const action = openBomb(5, stateBefore);
  expect(gridReducer(stateBefore, action)).toEqual(action.grid);
});

test('TOGGLE_FLAG: should return the grid passed in the action', () => {
  const stateBefore = Object.freeze(fillGrid(0, CreateGrid(10, 10, 25)));
  const action = toggleFlag(0, stateBefore);
  expect(gridReducer(stateBefore, action)).toEqual(action.grid);
});

test('RESET_GAME : should return the grid passed in the action', () => {
  const stateBefore = Object.freeze(fillGrid(0, CreateGrid(10, 10, 25)));
  const action = resetGame(stateBefore);
  expect(gridReducer(stateBefore, action)).toEqual(action.grid);
});

test('SET_MODE : should return the grid passed in the action', () => {
  const stateBefore = Object.freeze(fillGrid(0, CreateGrid(10, 10, 25)));
  const action = setMode('hard');
  expect(gridReducer(stateBefore, action)).toEqual(action.grid);
});

test('unknown action should return the state as is', () => {
  const stateBefore = Object.freeze(fillGrid(0, CreateGrid(10, 10, 25)));
  const action = Object.freeze({ type: 'MOO', grid: 'test' });
  expect(gridReducer(stateBefore, action)).toEqual(stateBefore);
});
