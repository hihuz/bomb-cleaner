import React from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../actions/actionCreators';
import Menu from './Menu';
import GameInfos from './GameInfos';
import Grid from './Grid';
import Overlay from './Overlay';
import '../../css/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      dialogOpened: false,
      hsDialogOpened: false,
      aboutDialogOpened: false,
      modeDialogOpened: false,
      congratsDialogOpened: false
    };
    this.closeDialog = this.closeDialog.bind(this);
    this.openModeDialog = this.openModeDialog.bind(this);
    this.openAboutDialog = this.openAboutDialog.bind(this);
    this.openHSDialog = this.openHSDialog.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateTime(),
      1000
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.gameStatus === 'won' &&
        nextProps.gameStatus !== this.props.gameStatus) {
      this.setState({ dialogOpened: 'congrats' });
    }
    if (nextProps.gameStatus === 'init') {
      this.setState({ time: 0 });
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  closeDialog() {
    this.setState({ dialogOpened: false });
  }
  openModeDialog() {
    this.setState({ dialogOpened: 'mode' });
  }
  openHSDialog() {
    this.setState({ dialogOpened: 'hs' });
  }
  openAboutDialog() {
    this.setState({ dialogOpened: 'about' });
  }
  handleResetClick() {
    this.props.dispatch(resetGame(this.props.grid));
  }
  updateTime() {
    const time = this.state.time;
    if (this.props.gameStatus === 'running' && time < 999) {
      this.setState({ time: time + 1 });
    }
  }
  render() {
    return (
      <div className="app">
        <Menu
          openModeDialog={this.openModeDialog}
          openAboutDialog={this.openAboutDialog}
          openHSDialog={this.openHSDialog}
        />
        <GameInfos
          bombsRemaining={this.props.bombsRemaining}
          time={this.state.time}
          handleReset={this.handleResetClick}
        />
        <Grid
          grid={this.props.grid}
          status={this.props.gameStatus}
        />
        <Overlay
          dialogOpened={this.state.dialogOpened}
          closeDialog={this.closeDialog}
          highScores={this.props.highScores}
          time={this.state.time}
          mode={this.props.mode}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bombsRemaining: state.grid.bombs - state.grid.flags,
  gameStatus: state.gameStatus,
  grid: state.grid,
  mode: state.mode,
  highScores: state.highScores
});

export default connect(mapStateToProps)(App);
