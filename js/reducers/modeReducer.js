import { SET_MODE } from '../actions/actionTypes';

const DEFAULT_STATE = 'easy';

const modeReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_MODE:
      return action.mode;
    default:
      return state;
  }
};

export default modeReducer;
