import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import { toggleFlag, openBomb, openCell, initGame } from '../actions/actionCreators';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }
  handleLeftClick(index, value) {
    const { grid, status, dispatchInitGame, dispatchOpenBomb, dispatchOpenCell } = this.props;
    if (status === 'init') {
      dispatchInitGame(index, grid);
    } else if (value === 'X') {
      dispatchOpenBomb(index, grid);
    } else {
      dispatchOpenCell(index, grid);
    }
  }
  handleRightClick(index) {
    const { grid, dispatchToggleFlag } = this.props;
    dispatchToggleFlag(index, grid);
  }
  render() {
    const { grid, status } = this.props;
    const styles = {
      width: `${grid.width * 24}px`,
      height: `${grid.height * 24}px`
    };
    return (
      <div className="grid" style={styles}>
        {grid.cells.map(cell => (
          <Cell
            handleLeftClick={cell.opened ||
                                cell.flagged ||
                                status === 'lost' ||
                                status === 'won' ? undefined : this.handleLeftClick}
            handleRightClick={cell.opened ||
                                 status === 'lost' ||
                                 status === 'won' ? undefined : this.handleRightClick}
            key={cell.index}
            {...cell}
          />
          ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchInitGame: (index, grid) => dispatch(initGame(index, grid)),
  dispatchOpenBomb: (index, grid) => dispatch(openBomb(index, grid)),
  dispatchOpenCell: (index, grid) => dispatch(openCell(index, grid)),
  dispatchToggleFlag: (index, grid) => dispatch(toggleFlag(index, grid))
});

export const Plain = Grid;
export default connect(null, mapDispatchToProps)(Grid);
