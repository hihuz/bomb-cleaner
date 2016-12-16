import { RESET_GAME, OPEN_BOMB_CELL, OPEN_NUMBER_CELL, OPEN_EMPTY_CELL, WIN_GAME, START_GAME } from '../actions/actionTypes';

const DEFAULT_STATE = 'init';

const gameStatusReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case WIN_GAME:
      return 'won';
    case OPEN_BOMB_CELL:
      return 'lost';
    case OPEN_EMPTY_CELL:
    case OPEN_NUMBER_CELL:
      return 'running';
    case RESET_GAME:
      return 'init';
    default:
      return state;
  }
};

export default gameStatusReducer;
