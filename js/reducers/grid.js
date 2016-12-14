import { CELL_LEFT_CLICK, CELL_RIGHT_CLICK, RESET_GAME } from '../actions/actionTypes';
import CreateGrid from '../app-logic/GridFactory';


const DEFAULT_STATE = CreateGrid(9, 9, 10);


function getCellIndex(x, y, width) {
  return x + width * y;
}

const applyCellLeftClick = (state, action) => {
  let grid = Object.assign({}, state);
  const index = getCellIndex(action.cellPos.x, action.cellPos.y, grid.width);
  let cell = grid.cells[index];

  cell.cellState = 'opened';
  grid.emptyCellsRemaining -= 1;

  grid.cells[index] = cell;
  return Object.assign({}, grid);
};

const applyCellRightClick = (state, action) => {
  let grid = Object.assign({}, state);
  const index = getCellIndex(action.cellPos.x, action.cellPos.y, grid.width);
  let cell = grid.cells[index];
  let flags = grid.flags;
  if (cell.cellState === 'flagged') {
    cell.cellState = 'hidden';
    grid.flags = flags - 1;
  }
  else {
    cell.cellState = 'flagged';
    grid.flags = flags + 1;
  }
  grid.cells[index] = cell;
  return Object.assign({}, grid );
};

//here the grid is created in the action creator so that the reducer stays pure
const resetGame = (state, action) => {
  return Object.assign({}, action.grid);
}


const gridReducer = (state = DEFAULT_STATE, action) => {
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

export default gridReducer;
