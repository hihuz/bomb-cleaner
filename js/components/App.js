import React from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import GameInfos from './GameInfos';
import Grid from './Grid';
import '../../css/main.css';

const App = (props) => (
  <div className="app">
    <Menu />
    <GameInfos />
    <Grid grid={props.grid} status={props.gameStatus} />
  </div>
);

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
