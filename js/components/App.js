import React from 'react';
import Menu from './Menu';
import GameInfos from './GameInfos';
import Grid from './Grid';
import '../../css/main.css';

const App = () => (
  <div classNme="app">
    <Menu />
    <GameInfos />
    <Grid />
  </div>
);

export default App;
