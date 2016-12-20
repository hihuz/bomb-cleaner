import React from 'react';
import { resetGame } from '../actions/actionCreators';
import { connect } from 'react-redux';
import BombTracker from './BombTracker';
import GameReset from './GameReset';
import GameTimer from './GameTimer';

class GameInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0 };
  }
  handleResetClick(e) {
    this.setState({ time: 0 });
    this.props.dispatch(resetGame());
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
    if (this.props.gameStatus==='running') {
      this.setState({ time: this.state.time + 1 });
    }
  }
  render() {
    return (
      <div className="game-infos">
        <BombTracker bombsRemaining={this.props.bombsRemaining} />
        <GameReset reset={this.handleResetClick.bind(this)} />
        <GameTimer time={this.state.time} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bombsRemaining: state.grid.bombs - state.grid.flags,
    gameStatus: state.gameStatus
  };
};

export default connect(mapStateToProps)(GameInfos);
