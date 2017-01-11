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
    e.preventDefault();
    if (this.props.handleLeftClick) {
      this.props.handleLeftClick(
        this.props.index,
        this.props.value
      );
    }
  }
  rightClick(e) {
    e.preventDefault();
    if (this.props.handleRightClick) { this.props.handleRightClick(this.props.index); }
  }
  render() {
    const styles = {
      color: this.props.value !== 'X' &&
             this.props.value !== ' ' &&
             this.props.opened ? this.colors[this.props.value] : this.colors[0]
    };
    return (
      <div
        className={`cell${this.props.opened ? ' opened' : ''}${this.props.value === 'X' && this.props.opened ? ' bomb' : ''}`}
        onClick={this.leftClick}
        onContextMenu={this.rightClick}
        style={styles}
      >
        {this.props.opened && this.props.value !== 'X' ? this.props.value : ' '}
        {this.props.opened && this.props.value === 'X' ? <i className="icon-bomb cell-icon" /> : ''}
        {this.props.flagged && !this.props.opened ? <i className="icon-flag cell-icon" /> : ''}
      </div>
    );
  }
}


export default Cell;
