import { ADD_HS } from '../actions/actionTypes';

const DEFAULT_STATE = {
  easy: [],
  medium: [],
  hard: []
};

const highScoresReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_HS:
      return action.highScores;
    default:
      return state;
  }
};

export default highScoresReducer;
