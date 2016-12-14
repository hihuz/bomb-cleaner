import React from 'react';
import BombTracker from './BombTracker';
import GameReset from './GameReset';
import GameTimer from './GameTimer';

const GameInfos = () => (
  <div className="game-infos">
    <BombTracker />
    <GameReset />
    <GameTimer />
  </div>
);

export default GameInfos;
