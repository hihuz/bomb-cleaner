import gameStatusReducer from './gameStatusReducer';
import CreateGrid, { fillGrid } from '../app-logic/GridFactory';

test('OPEN_BOMB: should return lost', () => {
  const action = { type: 'OPEN_BOMB', grid: 'moo' };
  expect(gameStatusReducer('running', action)).toEqual('lost');
});

test('OPEN_CELL: no more empty cells remaining should return won', () => {
  const grid = Object.assign({}, fillGrid(0, CreateGrid(10, 10, 9)), {
    emptyCellsRemaining: 0
  });
  const action = { type: 'OPEN_CELL', grid };
  expect(gameStatusReducer('running', action)).toEqual('won');
});

test('OPEN_CELL: cell opened should return running', () => {
  const action = { type: 'OPEN_CELL', grid: fillGrid(0, CreateGrid(10, 10, 9)) };
  expect(gameStatusReducer('running', action)).toEqual('running');
  expect(gameStatusReducer('init', action)).toEqual('running');
});

test('RESET_GAME: should return init', () => {
  const action = { type: 'RESET_GAME', grid: 'moo' };
  expect(gameStatusReducer('running', action)).toEqual('init');
  expect(gameStatusReducer('won', action)).toEqual('init');
  expect(gameStatusReducer('lost', action)).toEqual('init');
});

test('SET_MODE: should return init', () => {
  const action = { type: 'SET_MODE', grid: 'moo' };
  expect(gameStatusReducer('running', action)).toEqual('init');
  expect(gameStatusReducer('won', action)).toEqual('init');
  expect(gameStatusReducer('lost', action)).toEqual('init');
});

test('unknown action should return the state as is', () => {
  const action = { type: 'XXXXX', grid: 'moo' };
  expect(gameStatusReducer('running', action)).toEqual('running');
  expect(gameStatusReducer('lost', action)).toEqual('lost');
  expect(gameStatusReducer('won', action)).toEqual('won');
  expect(gameStatusReducer('init', action)).toEqual('init');
});
