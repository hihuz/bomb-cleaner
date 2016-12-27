import React from 'react';

const GameTimer = props => (
  <div className="game-infos-item">
    <div className="game-timer">
      <i className="icon-clock-o" />
      {props.time}
    </div>
  </div>
);

export default GameTimer;
