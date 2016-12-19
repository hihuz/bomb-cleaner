function getCellIndex(x, y, width) {
  return x + width * y;
}

function getNeighbors(index, cells, width) {
  const height = Math.floor(cells.length / width);
  const x = index % width;
  const y = Math.floor(index / width);
  const indexes = [
    y - 1 >= 0 && x - 1 >= 0 ? getCellIndex(x-1, y-1, width) : undefined,
    y - 1 >= 0 ? getCellIndex(x, y-1, width) : undefined,
    y - 1 >= 0 && x + 1 < width ? getCellIndex(x+1, y-1, width) : undefined,
    x - 1 >= 0 ? getCellIndex(x-1, y, width) : undefined,
    x + 1 < width ? getCellIndex(x+1, y, width) : undefined,
    y + 1 < height && x - 1 >= 0 ? getCellIndex(x-1, y+1, width) : undefined,
    y + 1 < height ? getCellIndex(x, y+1, width) : undefined,
    y + 1 < height && x + 1 < width ? getCellIndex(x+1, y+1, width) : undefined
  ];

  return indexes.map(i => cells[i]);
}

// takes an array of strings, length 8, should return the number of bombs inside aka "X"
function countBombs(neighbors) {
  if (Array.isArray(neighbors)) {
    return neighbors.reduce((acc, cur) => {
      return cur && cur.value === 'X' ? acc + 1 : acc;
    }, 0);
  }
  return 0;
}

export { countBombs, getNeighbors };
