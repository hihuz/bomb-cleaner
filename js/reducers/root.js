import { combineReducers } from 'redux';
import gridReducer from './gridReducer';
import gameStatusReducer from './gameStatusReducer';

const rootReducer = combineReducers({
  grid: gridReducer,
  gameStatus: gameStatusReducer
});

export default rootReducer;
