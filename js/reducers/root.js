import { combineReducers } from 'redux';
import gridReducer from './gridReducer';
import gameStatusReducer from './gameStatusReducer';
import highScoresReducer from './highScoresReducer';
import modeReducer from './modeReducer';

const rootReducer = combineReducers({
  grid: gridReducer,
  gameStatus: gameStatusReducer,
  mode: modeReducer,
  highScores: highScoresReducer
});

export default rootReducer;
