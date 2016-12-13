import { CELL_LEFT_CLICK, CELL_RIGHT_CLICK, RESET_GAME } from './actionTypes';
import GridFactory from './GridFactory';

//ONLY DEFINE A NEW BASIC GRID IN THE INITIAL STATE, NOT TIMER OR OPTIONS OR WHATNOT, THESE WILL BE DEFINED AFTER
const DEFAULT_STATE = {
  grid: GridFactory(9, 9, 10)
};

function getCellIndex(x, y, width) {
  return x + width * y;
}

//TODO : check where I should put the logic for opening a bomb ? and for wining the game ?
const applyLeftClick = (state, action) => {
  const grid = Object.assign({}, state.grid);
  const empty = grid.emptyCellsRemaining;
  const index = getCellIndex(action.cellPos.x, action.cellPos.y, grid.width);
  const cell = grid.cells[index];
  if (cell.cellState !== 'hidden') {
    return state;
  }
  else {
    cell.cellState = 'opened';
    grid.cells[index] = cell;
    grid.emptyCellsRemaining = empty - 1;
    return Object.assign({}, state, { grid: grid });
  }
};

const applyRightClick = (state, action) => {
  const grid = Object.assign({}, state.grid);
  const index = getCellIndex(action.cellPos.x, action.cellPos.y, grid.width);
  const cell = grid.cells[index];
  const flags = grid.flags;
  if (cell.cellState === 'flagged') {
    cell.cellState = 'hidden';
    grid.cells[index] = cell;
    grid.flags = flags - 1;
    return Object.assign({}, state, { grid: grid });
  }
  else if (cell.cellState === 'hidden') {
    cell.cellState = 'flagged';
    grid.cells[index] = cell;
    grid.flags = flags + 1;
    return Object.assign({}, state, { grid: grid });
  }
  else {
    return state;
  }
};

const resetGame = (state, action) => {
  const grid = state.grid;
  const newGrid = GridFactory(grid.width, grid.height, grid.bombs);

  return Object.assign({}, state, { grid: grid });
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CELL_LEFT_CLICK:
      return applyLeftClick(state, action);
    case CELL_RIGHT_CLICK:
      return applyRightClick(state, action);
    case RESET_GAME:
      return resetGame(state, action);
    default:
      return state;
  }
};

export default rootReducer;
