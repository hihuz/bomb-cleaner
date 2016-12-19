import CreateGrid from '../app-logic/GridFactory';
import { OPEN_CELL, OPEN_BOMB, TOGGLE_FLAG, RESET_GAME } from './actionTypes';

export function openCell(index) {
  return { type: OPEN_CELL, index };
}
export function openBomb(index) {
  return { type: OPEN_BOMB, index };
}
export function toggleFlag(index) {
  return { type: TOGGLE_FLAG, index };
}
export function resetGame() {
  const grid = CreateGrid(state.width, state.height, state.bombs);
  return { type: RESET_GAME; grid };
}
