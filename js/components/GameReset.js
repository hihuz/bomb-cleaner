import React from 'react';

const GameReset = props => (
  <div className="game-infos-item">
    <button className="reset-button" onClick={props.reset}>
      <i className="icon-refresh"></i>
    </button>
  </div>
);

export default GameReset;
