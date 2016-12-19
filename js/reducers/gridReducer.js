import { OPEN_NUMBER_CELL, OPEN_EMPTY_CELL, OPEN_BOMB_CELL, TOGGLE_FLAG, RESET_GAME } from '../actions/actionTypes';
import CreateGrid from '../app-logic/GridFactory';


const DEFAULT_STATE = CreateGrid(30, 16, 99);

const openNumberCell = (state, action) => {
  const grid = Object.assign({}, state);
  const index = action.index;
  const cell = grid.cells[index];

  cell.opened = true;
  grid.emptyCellsRemaining -= 1;

  grid.cells[index] = cell;
  return Object.assign({}, grid);
};

const openBombCell = (state, action) => {
  const grid = Object.assign({}, state);
  const updatedCells = grid.cells.map((cell) => {
    let updatedCell = Object.assign({}, cell, {
      opened: cell.isBomb || cell.opened
    });
    return updatedCell;
  });
  grid.cells = updatedCells;
  return Object.assign({}, grid);
}

const openEmptyCell = (state, action) => {
  const grid = Object.assign({}, state);

  return Object.assign({}, grid);
}

const toggleFlag = (state, action) => {
  const grid = Object.assign({}, state);
  const index = action.index;
  const cell = grid.cells[index];
  const flags = grid.flags;
  if (cell.flagged) {
    cell.flagged = false;
    grid.flags = flags - 1;
  } else {
    cell.flagged = true;
    grid.flags = flags + 1;
  }
  grid.cells[index] = cell;
  return Object.assign({}, grid);
};

const resetGame = (state, action) => {
  return Object.assign({}, action.grid);
}

const gridReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case OPEN_NUMBER_CELL:
    case OPEN_EMPTY_CELL: // FIX THIS TO OPEN ALL NEEDED CELLS RECURSIVELY, create another reducer for this ?
      return openNumberCell(state, action);
    case OPEN_BOMB_CELL:
      return openBombCell(state, action);
    case TOGGLE_FLAG:
      return toggleFlag(state, action);
    case RESET_GAME:
      return resetGame(state, action);
    default:
      return state;
  }
};

export default gridReducer;
