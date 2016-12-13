import { CELL_LEFT_CLICK, CELL_RIGHT_CLICK, RESET_GAME } from './actionTypes';
import GridFactory from './GridFactory';

//ONLY DEFINE A NEW BASIC GRID IN THE INITIAL STATE, NOT TIMER OR OPTIONS OR WHATNOT, THESE WILL BE DEFINED AFTER
const DEFAULT_STATE = {
  grid: GridFactory(9, 9, 10),
  gameStatus: 'init'
};

function getCellIndex(x, y, width) {
  return x + width * y;
}

//TODO : when game is lost, all bombs should be shown, all flagged bombs should be marked as wrong
//       clicked bomb should be highlighted (red ?)
const applyCellLeftClick = (state, action) => {
  let grid = Object.assign({}, state.grid);
  let gameStatus = state.gameStatus;
  let empty = grid.emptyCellsRemaining;
  const index = getCellIndex(action.cellPos.x, action.cellPos.y, grid.width);
  let cell = grid.cells[index];

  if (cell.cellState !== 'hidden' || gameStatus === 'lost' || gameStatus === 'won') {
    return state;
  }
  else if (cell.isBomb) {
    gameStatus = 'lost';
    cell.cellState = 'opened';
  }
  else {
    if (gameStatus === 'init') { gameStatus = 'running'; }
    cell.cellState = 'opened';
    grid.emptyCellsRemaining = empty - 1;
    if (grid.emptyCellsRemaining === 0) { gameStatus = 'won'; }
  }

  grid.cells[index] = cell;
  return Object.assign({}, state, { grid: grid, gameStatus: gameStatus });
};

const applyCellRightClick = (state, action) => {
  let grid = Object.assign({}, state.grid);
  let gameStatus = state.gameStatus;
  const index = getCellIndex(action.cellPos.x, action.cellPos.y, grid.width);
  let cell = grid.cells[index];
  let flags = grid.flags;
  if (cell.cellState === 'opened' || gameStatus === 'lost' || gameStatus === 'won') {
    return state;
  }
  if (cell.cellState === 'flagged') {
    cell.cellState = 'hidden';
    grid.cells[index] = cell;
    grid.flags = flags - 1;
    return Object.assign({}, state, { grid: grid });
  }
  else {
    cell.cellState = 'flagged';
    grid.cells[index] = cell;
    grid.flags = flags + 1;
    return Object.assign({}, state, { grid: grid });
  }
};

const resetGame = (state, action) => {
  return Object.assign({}, state, { grid: action.grid, gameStatus: 'init' });
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CELL_LEFT_CLICK:
      return applyCellLeftClick(state, action);
    case CELL_RIGHT_CLICK:
      return applyCellRightClick(state, action);
    case RESET_GAME:
      return resetGame(state, action);
    default:
      return state;
  }
};

export default rootReducer;
