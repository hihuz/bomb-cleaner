import React from 'react';

const Cell = ({ handleLeftClick, handleRightClick, index, opened, flagged, value }) => {
  const colors = ['#000', '#0100fe', '#017f01', '#fe0000', '#010080', '#810102', '#008081', '#000', '#808080'];
  const styles = {
    color: value !== 'X' && value !== ' ' && opened ? colors[value] : colors[0]
  };
  function leftClick(e) {
    e.preventDefault();
    if (handleLeftClick) { handleLeftClick(index, value); }
  }
  function rightClick(e) {
    e.preventDefault();
    if (handleRightClick) { handleRightClick(index); }
  }
  return (
    <div
      className={`cell${opened ? ' opened' : ''}${value === 'X' && opened ? ' bomb' : ''}`}
      onClick={leftClick}
      onContextMenu={rightClick}
      style={styles}
    >
      {opened && value !== 'X' ? value : ' '}
      {opened && value === 'X' ? <i className="icon-bomb" /> : ' '}
      {flagged && !opened ? <i className="icon-flag" /> : ''}
    </div>
  );
};

export default Cell;
