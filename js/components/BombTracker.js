import React from 'react';

const BombTracker = props => (
  <div className="game-infos-item">
    <div className="bomb-tracker">
      <i className="icon-bomb" />
      {props.bombsRemaining}
    </div>
  </div>
);

export default BombTracker;
