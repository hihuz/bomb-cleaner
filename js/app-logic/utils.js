function splitPlan(plan) {
  return plan.reduce((acc, cur) => [...acc, ...(cur.split(''))], []);
}

function getCellIndex(x, y, width) {
  return x + width * y;
}

function getNeighbors(x, y, plan) {
  const neighbors = [
    plan[y-1] ? plan[y-1].charAt(x-1) : undefined,
    plan[y-1] ? plan[y-1].charAt(x) : undefined,
    plan[y-1] ? plan[y-1].charAt(x+1) : undefined,
    plan[y].charAt(x-1),
    plan[y].charAt(x+1),
    plan[y+1] ? plan[y+1].charAt(x-1) : undefined,
    plan[y+1] ? plan[y+1].charAt(x) : undefined,
    plan[y+1] ? plan[y+1].charAt(x+1) : undefined
  ];

  return neighbors.map(neighbor => neighbor == "" ? undefined : neighbor);
}

// FIX THIS, MERGE WITH GETNEIGHBORS AND GET RID OF ALL THE PLAN STUFF, ONLY HANDLE CELLS..
// ADD TESTS FOR THIS AS WELL
function getCellNeighbors(index, grid) {
  const width = grid.width;
  const height = grid.height;
  const x = index / grid.width;
  const y = Math.floor(index / grid.width);
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

  return indexes.map(i => grid.cells[i]);
}

// takes an array of strings, length 8, should return the number of bombs inside aka "X"
function countBombs(neighbors) {
  if (Array.isArray(neighbors)) {
    return neighbors.reduce((acc, cur) => (cur === 'X' ? acc + 1 : acc), 0);
  }
  return 0;
}

export { splitPlan, countBombs, getNeighbors, getCellNeighbors };
