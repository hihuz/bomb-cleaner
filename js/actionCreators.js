import { CELL_LEFT_CLICK, CELL_RIGHT_CLICK, RESET_GAME } from './actionTypes';

//not sure if I should identify it with an ID or with coordinates, coordinates looks better for now:
// cellPos {
//  x:
//  y:
//}
//these come from the react component, it should hold only its position when it's hidden/closed/flagged
export function dispatchLeftClick (cellPos) {
  return { type: CELL_LEFT_CLICK, cellPos };
};

export function dispatchRightClick (cellPos) {
  return { type: CELL_RIGHT_CLICK, cellPos };
};

export function resetGame () {
  return { type: RESET_GAME };
};
