import React from 'react';

const GameReset = props => (
  <div className="game-reset">
    <button className="reset-button" onClick={props.reset}>reset!</button>
  </div>
);

export default GameReset;
