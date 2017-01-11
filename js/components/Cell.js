import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.colors = [
      '#000',
      '#0100fe',
      '#017f01',
      '#fe0000',
      '#010080',
      '#810102',
      '#008081',
      '#000',
      '#808080'
    ];
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
  }

  leftClick(e) {
    const { handleLeftClick, index, value } = this.props;
    e.preventDefault();
    if (handleLeftClick) { handleLeftClick(index, value); }
  }
  rightClick(e) {
    const { handleRightClick, index } = this.props;
    e.preventDefault();
    if (handleRightClick) { handleRightClick(index); }
  }
  render() {
    const { value, opened, flagged } = this.props;
    const styles = {
      color: value !== 'X' &&
             value !== ' ' &&
             opened ? this.colors[value] : this.colors[0]
    };
    return (
      <div
        className={`cell${opened ? ' opened' : ''}${value === 'X' && opened ? ' bomb' : ''}`}
        onClick={this.leftClick}
        onContextMenu={this.rightClick}
        style={styles}
      >
        {opened && value !== 'X' ? value : ' '}
        {opened && value === 'X' ? <i className="icon-bomb cell-icon" /> : ''}
        {flagged && !opened ? <i className="icon-flag cell-icon" /> : ''}
      </div>
    );
  }
}

export default Cell;
