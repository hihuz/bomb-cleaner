import CreateGrid, { fillGrid } from '../app-logic/GridFactory';
import { OPEN_CELL, OPEN_BOMB, TOGGLE_FLAG, RESET_GAME, INIT_GAME, SET_MODE } from './actionTypes';

export function openCell(index) {
  return { type: OPEN_CELL, index };
}
export function openBomb(index) {
  return { type: OPEN_BOMB, index };
}
export function toggleFlag(index) {
  return { type: TOGGLE_FLAG, index };
}
export function initGame(index, grid) {
  const filledGrid = fillGrid(index, grid);
  return { type: INIT_GAME, index, grid: filledGrid };
}
export function resetGame() {
  return { type: RESET_GAME };
}
export function setMode(mode) {
  return { type: SET_MODE, mode };
}
