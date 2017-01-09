import CreateGrid, { fillGrid } from '../app-logic/GridFactory';
import { getIndexesToOpen } from '../app-logic/utils';
import { OPEN_CELL, OPEN_BOMB, TOGGLE_FLAG, RESET_GAME, SET_MODE, ADD_HS } from './actionTypes';

function openCell(index, grid) {
  const newGrid = Object.assign({}, grid);
  const indexes = getIndexesToOpen(index, newGrid.cells, newGrid.width);
  const updatedCells = newGrid.cells.map((cell) => {
    const updatedCell = Object.assign({}, cell, {
      opened: indexes.indexOf(cell.index) !== -1 || cell.opened
    });
    return updatedCell;
  });
  newGrid.cells = updatedCells;
  newGrid.emptyCellsRemaining -= indexes.length;

  return { type: OPEN_CELL, grid: newGrid };
}

function openBomb(index, grid) {
  const newGrid = Object.assign({}, grid);
  const updatedCells = newGrid.cells.map((cell) => {
    const updatedCell = Object.assign({}, cell, {
      opened: cell.isBomb || cell.opened
    });
    return updatedCell;
  });
  newGrid.cells = updatedCells;

  return { type: OPEN_BOMB, grid: newGrid };
}

function toggleFlag(index, grid) {
  const newGrid = Object.assign({}, grid);
  const cell = newGrid.cells[index];
  const flags = newGrid.flags;
  if (cell.flagged) {
    cell.flagged = false;
    newGrid.flags = flags - 1;
  } else {
    cell.flagged = true;
    newGrid.flags = flags + 1;
  }
  newGrid.cells[index] = cell;
  return { type: TOGGLE_FLAG, grid: newGrid };
}

function initGame(index, grid) {
  const filledGrid = fillGrid(index, grid);
  return openCell(index, filledGrid);
}

function resetGame(grid) {
  const newGrid = CreateGrid(grid.width, grid.height, grid.bombs);
  return { type: RESET_GAME, grid: newGrid };
}

function setMode(mode, width, height, bombs) {
  let grid;
  if (mode === 'easy') { grid = CreateGrid(9, 9, 10); }
  if (mode === 'medium') { grid = CreateGrid(16, 16, 40); }
  if (mode === 'hard') { grid = CreateGrid(30, 16, 99); }
  if (mode === 'custom') { grid = CreateGrid(width, height, bombs); }

  return { type: SET_MODE, mode, grid };
}

// this is a bit ugly, try to refactor later
function addHighScore(mode, name, time, date, highScores) {
  let index;
  const curHS = highScores[mode];
  const sliceEnd = Math.min(curHS.length, 4);
  curHS.forEach((hs, i) => {
    if (hs.time > time && index === undefined) { index = i; }
  });
  if (index === undefined) { index = sliceEnd; }
  const updatedHS = Object.assign({}, highScores, {
    [mode]: [
      ...curHS.slice(0, index),
      {
        name,
        time,
        date
      },
      ...curHS.slice(index, sliceEnd)
    ]
  });

  return { type: ADD_HS, highScores: updatedHS };
}

export { openCell, openBomb, toggleFlag, initGame, resetGame, setMode, addHighScore };
