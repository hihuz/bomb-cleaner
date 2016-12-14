function splitPlan(plan) {
  return plan.reduce((acc, cur) => [...acc, ...(cur.split(''))], []);
}

function getNeighbors(cell, plan) {
  const x = cell.pos.x;
  const y = cell.pos.y;
  const width = plan[0].length;
  const split = splitPlan(plan);
  const indexes = [
    (x - 1) + ((y - 1) * width),
    x + ((y - 1) * width),
    (x + 1) + ((y - 1) * width),
    (x - 1) + (y * width),
    (x + 1) + (y * width),
    (x - 1) + ((y + 1) * width),
    (x) + ((y + 1) * width),
    (x + 1) + ((y + 1) * width)
  ];

  return indexes.map(index => split[index]);
}

// takes an array of strings, length 8, should return the number of bombs inside aka "X"
function countBombs(neighbors) {
  if (Array.isArray(neighbors)) {
    return neighbors.reduce((acc, cur) => {
      return cur === 'X' ? acc = acc + 1 : acc;
    }, 0);
  }
  return 0;
}

export { splitPlan, countBombs, getNeighbors };
