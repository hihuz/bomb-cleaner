import React from 'react';
import { connect } from 'react-redux';
import { resetGame, setMode } from '../actions/actionCreators';
import Menu from './Menu';
import GameInfos from './GameInfos';
import Grid from './Grid';
import '../../css/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0 };
  }

  handleResetClick(e) {
    this.setState({ time: 0 });
    this.props.dispatch(resetGame());
  }
  setEasyMode(e) {
    e.preventDefault();
    this.setState({ time: 0 });
    this.props.dispatch(setMode('easy'));
  }
  setMediumMode(e) {
    e.preventDefault();
    this.setState({ time: 0 });
    this.props.dispatch(setMode('medium'));
  }
  setHardMode(e) {
    e.preventDefault();
    this.setState({ time: 0 });
    this.props.dispatch(setMode('hard'));
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateTime(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  updateTime() {
    let time = this.state.time;
    if (this.props.gameStatus==='running' && time < 999) {
      this.setState({ time: time + 1 });
    }
  }
  render() {
    return (
      <div className="app">
        <Menu mode={this.props.mode} setEasyMode={this.setEasyMode.bind(this)} setMediumMode={this.setMediumMode.bind(this)} setHardMode={this.setHardMode.bind(this)} />
        <GameInfos
          bombsRemaining={this.props.bombsRemaining}
          time={this.state.time}
          handleReset={this.handleResetClick.bind(this)}
        />
        <Grid grid={this.props.grid} status={this.props.gameStatus} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bombsRemaining: state.grid.bombs - state.grid.flags,
    gameStatus: state.gameStatus,
    grid: state.grid,
    mode: state.mode
  };
};

export default connect(mapStateToProps)(App);
