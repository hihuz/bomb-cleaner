import React from 'react';

const Cell = ({ handleLeftClick, handleRightClick, index, opened, flagged, value }) => {
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
      className={`cell${opened? ' opened':''}${value === "X" && opened ? ' bomb':''}`}
      onClick={leftClick}
      onContextMenu={rightClick}
    >
      {opened ? value : ' '}
      {flagged ? 'f' : ' '}
    </div>
  );
}

export default Cell;
