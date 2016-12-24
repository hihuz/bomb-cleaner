import { OPEN_CELL, OPEN_BOMB, TOGGLE_FLAG, RESET_GAME, SET_MODE } from '../actions/actionTypes';
import CreateGrid from '../app-logic/GridFactory';

const DEFAULT_STATE = CreateGrid(9, 9, 10);

const gridReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case OPEN_CELL:
    case OPEN_BOMB:
    case TOGGLE_FLAG:
    case SET_MODE:
    case RESET_GAME:
      return Object.assign({}, action.grid);
    default:
      return state;
  }
};

export default gridReducer;
