import { combineReducers } from 'redux';
import gridReducer from './gridReducer';
import gameStatusReducer from './gameStatusReducer';
import modeReducer from './modeReducer';

const rootReducer = combineReducers({
  grid: gridReducer,
  gameStatus: gameStatusReducer,
  mode: modeReducer
});

export default rootReducer;
