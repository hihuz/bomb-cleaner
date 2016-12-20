import React from 'react';

const BombTracker = (props) => (
  <div className="bomb-tracker">
    {props.bombsRemaining}
  </div>
);

export default BombTracker;
