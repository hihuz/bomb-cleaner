import { RESET_GAME, OPEN_BOMB, OPEN_CELL, WIN_GAME, INIT_GAME, SET_MODE } from '../actions/actionTypes';

const DEFAULT_STATE = 'init';

const gameStatusReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case WIN_GAME:
      return 'won';
    case OPEN_BOMB:
      return 'lost';
    case INIT_GAME:
      return 'running';
    case RESET_GAME:
    case SET_MODE:
      return 'init';
    default:
      return state;
  }
};

export default gameStatusReducer;
