import { OPEN_CELL, OPEN_BOMB, TOGGLE_FLAG, RESET_GAME } from '../actions/actionTypes';
import CreateGrid from '../app-logic/GridFactory';
import { getIndexesToOpen } from '../app-logic/utils';

const DEFAULT_STATE = CreateGrid(30, 16, 99);

const openCell = (state, action) => {
  const grid = Object.assign({}, state);

  const indexes = getIndexesToOpen(action.index, grid.cells, grid.width);
  let updatedCells = grid.cells.map((cell) => {
    let updatedCell = Object.assign({}, cell, {
      opened: indexes.indexOf(cell.index) !== -1 || cell.opened
    });
    return  updatedCell;
  });
  grid.cells = updatedCells;
  grid.emptyCellsRemaining -= indexes.length;

  return Object.assign({}, grid);
};

const openBomb = (state, action) => {
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
    case OPEN_CELL:
      return openCell(state, action);
    case OPEN_BOMB:
      return openBomb(state, action);
    case TOGGLE_FLAG:
      return toggleFlag(state, action);
    case RESET_GAME:
      return resetGame(state, action);
    default:
      return state;
  }
};

export default gridReducer;
