import React from 'react';
import Cell from './Cell';
import { connect } from 'react-redux';
import { toggleFlag, openBomb, openCell, initGame } from '../actions/actionCreators';

const Grid = ({ grid, status, dispatch }) => {
  function handleLeftClick(index, value) {
    if (status == 'init') { dispatch(initGame(index, grid)); }
    else if (value == "X") {
      dispatch(openBomb(index, grid));
    }
    else {
      dispatch(openCell(index, grid));
    }
  }
  function handleRightClick(index) {
      dispatch(toggleFlag(index, grid));
  }
  const styles = {
    width: grid.width * 24 + "px",
    height: grid.height * 24 + "px"
  }
  return (
    <div className="grid" style={styles}>
      {grid.cells.map((cell) => {
        return (
          <Cell
            handleLeftClick={ cell.opened ||
                              cell.flagged ||
                              status == 'lost' ||
                              status == 'won' ? undefined : handleLeftClick }
            handleRightClick={ cell.opened ||
                               status == 'lost' ||
                               status == 'won' ? undefined : handleRightClick }
            key={cell.index}
            {...cell}
          />
        );
      })}
    </div>
  );
};

export default connect()(Grid);
