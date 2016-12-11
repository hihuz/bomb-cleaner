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
  //THIS LOOKS LIKE A LOT OF DUPLICATION FROM DISPATCHLEFT ABOVE, MERGE THE 2 WITH A PARAM ?
  //calculate the new object describing the cell state here
  //so I will probably have to call getState from here to get the current cell
  //should return a cell-looking object, that is :
  // cell {
  //   value: values should range from 0 to 8 (number of neighbors bombs)
  //   isBomb: true/false
  //   pos: { x:, y: }
  //   cellState: hidden / opened / flagged << ONLY THIS WOULD BE UPDATED HERE SO RETURN ONLY THAT ??
  // }
  return { type: CELL_RIGHT_CLICK, cellPos };
};

export function resetGame () {
  return { type: RESET_GAME };
};
