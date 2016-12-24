import { RESET_GAME, OPEN_BOMB, OPEN_CELL, SET_MODE } from '../actions/actionTypes';

const DEFAULT_STATE = 'init';

function openCell(state, action) {
  if (action.grid.emptyCellsRemaining === 0) {
    return 'won';
  }
  return 'running';
}

const gameStatusReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case OPEN_BOMB:
      return 'lost';
    case OPEN_CELL:
      return openCell(state, action);
    case RESET_GAME:
    case SET_MODE:
      return 'init';
    default:
      return state;
  }
};

export default gameStatusReducer;
