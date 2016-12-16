import CreateGrid from '../app-logic/GridFactory';
import { OPEN_EMPTY_CELL, OPEN_NUMBER_CELL, OPEN_BOMB_CELL, TOGGLE_FLAG, RESET_GAME } from './actionTypes';

export function openNumberCell(index) {
  return { type: OPEN_NUMBER_CELL, index };
}
export function openEmptyCell(index) {
  return { type: OPEN_EMPTY_CELL, index };
}
export function openBombCell(index) {
  return { type: OPEN_BOMB_CELL, index };
}
export function toggleFlag(index) {
  return { type: TOGGLE_FLAG, index };
}
export function resetGame() {
  return { type: RESET_GAME };
}
