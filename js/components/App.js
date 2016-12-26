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
    this.openModeDialog = this.openModeDialog.bind(this);
    this.closeModeDialog = this.closeModeDialog.bind(this);
    this.openAboutDialog = this.openAboutDialog.bind(this);
    this.closeAboutDialog = this.closeAboutDialog.bind(this);
    this.openHSDialog = this.openHSDialog.bind(this);
    this.closeHSDialog = this.closeHSDialog.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.closeCongratsDialog = this.closeCongratsDialog.bind(this);
  }

  handleResetClick(e) {
    this.setState({ time: 0 });
    this.props.dispatch(resetGame(this.props.grid));
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
    if (nextProps.gameStatus === 'won' &&
        nextProps.gameStatus !== this.props.gameStatus) {
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
        <ModeDialog
          opened={this.state.modeDialogOpened}
          closeModeDialog={this.closeModeDialog}
        />
        <HSDialog
          opened={this.state.hsDialogOpened}
          highScores={this.props.highScores}
          closeHSDialog={this.closeHSDialog}
        />
        <AboutDialog
          opened={this.state.aboutDialogOpened}
          closeAboutDialog={this.closeAboutDialog}
        />
        <CongratsDialog
          time={this.state.time}
          mode={this.props.mode}
          highScores={this.props.highScores}
          opened={this.state.congratsDialogOpened}
          closeCongratsDialog={this.closeCongratsDialog}
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
