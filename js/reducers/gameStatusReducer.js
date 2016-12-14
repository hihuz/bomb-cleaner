import { RESET_GAME, WIN_GAME, LOSE_GAME, START_GAME } from '../actions/actionTypes';

const DEFAULT_STATE = 'init';

const gameStatusReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case WIN_GAME:
      return 'won';
    case LOSE_GAME:
      return 'lost';
    case START_GAME:
      return 'running';
    case RESET_GAME:
      return 'init';
    default:
      return state;
  }
};

export default gameStatusReducer;
