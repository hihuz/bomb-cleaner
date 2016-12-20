import React from 'react';
import Cell from './Cell';
import { connect } from 'react-redux';
import { toggleFlag, openBomb, openCell } from '../actions/actionCreators';

const Grid = ({ grid, status, dispatch }) => {
  function handleLeftClick(index, value) {
    switch (value) {
      case "X":
        return dispatch(openBombCell(index));
      default:
        return dispatch(openCell(index));
    }
  }
  function handleRightClick(index) {
      dispatch(toggleFlag(index));
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
}

export default connect()(Grid);
