import CreateGrid from '../app-logic/GridFactory';
import { CELL_LEFT_CLICK, CELL_RIGHT_CLICK, RESET_GAME } from './actionTypes';

export function dispatchCellLeftClick(cellPos) {
  return { type: CELL_LEFT_CLICK, cellPos };
}

export function dispatchCellRightClick(cellPos) {
  return { type: CELL_RIGHT_CLICK, cellPos };
}

export function resetGame(width, height, bombs) {
  const newGrid = CreateGrid(width, height, bombs);
  return { type: RESET_GAME, grid: newGrid };
}
