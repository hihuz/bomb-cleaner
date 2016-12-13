//takes a cell and a grid plan
//should return an array of strings representing the neighbor cells, length 8, starting from top left, return undefined for cells out of the grid / non-existent
function getNeighbors(cell, plan) {
  const x = cell.pos.x;
  const y = cell.pos.y;
  const width = plan[0].length;
  const height = plan.length;

  const split = splitPlan(plan);
  const indexes = [(x-1) + (y-1) * width,
                   (x) + (y-1) * width,
                   (x+1) + (y-1) * width,
                   (x-1) + (y) * width,
                   (x+1) + (y) * width,
                   (x-1) + (y+1) * width,
                   (x) + (y+1) * width,
                   (x+1) + (y+1) * width];

  return indexes.map(function(index) {
    return split[index];
  });
}

 function splitPlan (plan) {
  return plan.reduce((acc, cur) => {
    return [...acc, ...(cur.split(""))];
    // return acc.concat(cur.split(""));
  }, []);
}

//takes an array of strings, length 8, should return the number of bombs inside aka "X"
function countBombs(neighbors) {
  if (Array.isArray(neighbors)) {
    return neighbors.reduce((acc, cur) => {
      return cur === "X" ? acc += 1 : acc;
    }, 0);
  }
  else {
    return 0;
  }
}

export { splitPlan, countBombs, getNeighbors };
