import { RESET_GAME, OPEN_BOMB, OPEN_CELL, WIN_GAME, START_GAME } from '../actions/actionTypes';

const DEFAULT_STATE = 'init';

const gameStatusReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case WIN_GAME:
      return 'won';
    case OPEN_BOMB:
      return 'lost';
    case OPEN_CELL:
      return 'running';
    case RESET_GAME:
      return 'init';
    default:
      return state;
  }
};

export default gameStatusReducer;
