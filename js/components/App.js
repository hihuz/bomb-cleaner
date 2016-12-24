import React from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../actions/actionCreators';
import Menu from './Menu';
import GameInfos from './GameInfos';
import Grid from './Grid';
import ModeDialog from './ModeDialog';
import HSDialog from './HSDialog';
import AboutDialog from './AboutDialog';
import CongratsDialog from './CongratsDialog';
import '../../css/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      hsDialogOpened: false,
      aboutDialogOpened: false,
      modeDialogOpened: false,
      congratsDialogOpened: false
    };
  }

  handleResetClick(e) {
    this.setState({ time: 0 });
    this.props.dispatch(resetGame(this.props.grid));
  }
  handleHSReset(e) {
    this.props.dispatch(resetHighScores());
  }
  openModeDialog(e) {
    this.setState({ modeDialogOpened: true });
  }
  closeModeDialog(e) {
    this.setState({ modeDialogOpened: false });
  }
  openHSDialog(e) {
    this.setState({ hsDialogOpened: true });
  }
  closeHSDialog(e) {
    this.setState({ hsDialogOpened: false });
  }
  openAboutDialog(e) {
    this.setState({ aboutDialogOpened: true });
  }
  closeAboutDialog(e) {
    this.setState({ aboutDialogOpened: false });
  }
  closeCongratsDialog(e) {
    this.setState({ congratsDialogOpened: false });
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.gameStatus === 'won') {
      this.setState({ congratsDialogOpened: true });
    }
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
        <Menu
          openModeDialog={this.openModeDialog.bind(this)}
          openAboutDialog={this.openAboutDialog.bind(this)}
          openHSDialog={this.openHSDialog.bind(this)}
        />
        <GameInfos
          bombsRemaining={this.props.bombsRemaining}
          time={this.state.time}
          handleReset={this.handleResetClick.bind(this)}
        />
        <Grid
          grid={this.props.grid}
          status={this.props.gameStatus}
        />
        <ModeDialog
          opened={this.state.modeDialogOpened}
          closeModeDialog={this.closeModeDialog.bind(this)}
        />
        <HSDialog
          opened={this.state.hsDialogOpened}
          highScores={this.props.highScores}
          closeHSDialog={this.closeHSDialog.bind(this)}
        />
        <AboutDialog
          opened={this.state.aboutDialogOpened}
          closeAboutDialog={this.closeAboutDialog.bind(this)}
        />
        <CongratsDialog
          time={this.state.time}
          mode={this.props.mode}
          highScores={this.props.highScores}
          opened={this.state.congratsDialogOpened}
          closeCongratsDialog={this.closeCongratsDialog.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bombsRemaining: state.grid.bombs - state.grid.flags,
    gameStatus: state.gameStatus,
    grid: state.grid,
    mode: state.mode,
    highScores: state.highScores
  };
};

export default connect(mapStateToProps)(App);
