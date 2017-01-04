import React from 'react';
import BombTracker from './BombTracker';
import GameReset from './GameReset';
import GameTimer from './GameTimer';

const GameInfos = ({ bombsRemaining, time, handleReset }) => (
  <div className="game-infos">
    <BombTracker bombsRemaining={bombsRemaining} />
    <GameReset reset={handleReset} />
    <GameTimer time={time} />
  </div>
);

export default GameInfos;
