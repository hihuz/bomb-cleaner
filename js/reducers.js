import { CELL_LEFT_CLICK, CELL_RIGHT_CLICK, RESET_GAME } from './actionTypes';
import GridFactory from './GridFactory';

//ONLY DEFINE A NEW BASIC GRID IN THE INITIAL STATE, NOT TIMER OR OPTIONS OR WHATNOT, THESE WILL BE DEFINED AFTER
const DEFAULT_STATE = {
  grid: GridFactory(9, 9, 10)
};

function getCellIndex(x, y, width) {
  return x + width * y;
}

const applyLeftClick = (state, action) => {
  //calculate the new object describing the cell state here
  //so I will have to call getState from here to get the current cell state and also neighbors state
  //should return a cell-looking object, that is :
  // cell {
  //   value: values should range from 0 to 8 (number of neighbors bombs)
  //   isBomb: true/false
  //   pos: { x:, y: }
  //   cellState: hidden / opened / flagged << THIS WOULD BE UPDATED HERE
  // }

  // !!!!!!!!!!! SHOULD BE RECURSIVE AND CALL ITSELF ON 8 NEIGHBORS IF VALUE IS 0 !!!!!!!!!!!!!!!!!!!!!!
  const grid = state.grid;
  const index = getCellIndex(action.cellPos.x, action.cellPos.y, grid.width);
  const cell = grid.cells[index];
  if (cell.cellState) !== 'hidden') {
    return state;
  }
  else {

  }



  return Object.assign({}, state, { grid: grid });
};
//DEFINE RIGHT CLICK AND RESET GAME REDUCERS BELOW

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CELL_LEFT_CLICK:
      return applyLeftClick(state, action);
    case CELL_RIGHT_CLICK:
      return applyRightClick(state, action);
    case RESET_GAME:
      return resetGame(state, action);
    default:
      return state;
  }
};

export default rootReducer;
