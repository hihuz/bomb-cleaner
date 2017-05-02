import React from 'react';
import { connect } from 'react-redux';
import { setMode } from '../actions/actionCreators';

class ModeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      width: this.props.width,
      height: this.props.height,
      bombs: this.props.bombs
    };
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.setLocalEasyMode = this.setLocalEasyMode.bind(this);
    this.setLocalMediumMode = this.setLocalMediumMode.bind(this);
    this.setLocalHardMode = this.setLocalHardMode.bind(this);
    this.setLocalCustomMode = this.setLocalCustomMode.bind(this);
    this.verifyWidthValue = this.verifyWidthValue.bind(this);
    this.setLocalWidth = this.setLocalWidth.bind(this);
    this.verifyHeightValue = this.verifyHeightValue.bind(this);
    this.setLocalHeight = this.setLocalHeight.bind(this);
    this.verifyBombsValue = this.verifyBombsValue.bind(this);
    this.setLocalBombs = this.setLocalBombs.bind(this);
    this.pushNewMode = this.pushNewMode.bind(this);
  }
  setLocalEasyMode() {
    this.setState({
      mode: 'easy',
      width: 9,
      height: 9,
      bombs: 10
    });
  }
  setLocalMediumMode() {
    this.setState({
      mode: 'medium',
      width: 16,
      height: 16,
      bombs: 40
    });
  }
  setLocalHardMode() {
    this.setState({
      mode: 'hard',
      width: 30,
      height: 16,
      bombs: 99
    });
  }
  setLocalCustomMode() {
    this.setState({ mode: 'custom' });
  }
  setLocalWidth(e) {
    this.setState({ width: e.target.value });
  }
  setLocalHeight(e) {
    this.setState({ height: e.target.value });
  }
  setLocalBombs(e) {
    this.setState({ bombs: e.target.value });
  }
  verifyWidthValue(e) {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 9) {
      this.setState({ width: 9 });
    } else if (value > 24) {
      this.setState({ width: 30 });
    }
  }
  verifyHeightValue(e) {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 9) {
      this.setState({ height: 9 });
    } else if (value > 30) {
      this.setState({ height: 30 });
    }
  }
  verifyBombsValue(e) {
    const value = Number(e.target.value);
    const size = this.state.width * this.state.height;
    if (isNaN(value) || value < 10) {
      this.setState({ bombs: 10 });
    } else if (value > 668 && size > 668) {
      this.setState({ bombs: 668 });
    } else if (value >= size) {
      this.setState({ bombs: size - 1 });
    }
  }
  handleCloseClick() {
    this.setState({ mode: this.props.mode });
    this.props.closeDialog();
  }
  pushNewMode() {
    this.props.dispatch(setMode(this.state));
    this.props.closeDialog();
  }
  render() {
    return (
      <div>
        <button className="dialog-close" onClick={this.handleCloseClick}>
          <i className="icon-close" />
        </button>
        <button
          className="mode-dialog-button"
          disabled={this.state.mode === 'easy'}
          onClick={this.setLocalEasyMode}
        >Easy</button>
        <button
          className="mode-dialog-button"
          disabled={this.state.mode === 'medium'}
          onClick={this.setLocalMediumMode}
        >Medium</button>
        <button
          className="mode-dialog-button"
          disabled={this.state.mode === 'hard'}
          onClick={this.setLocalHardMode}
        >Hard</button>
        <button
          className="mode-dialog-button"
          disabled={this.state.mode === 'custom'}
          onClick={this.setLocalCustomMode}
        >Custom:</button>
        <div>
          <label htmlFor="width-input">Width (9-30): </label>
          <input
            className="mode-input"
            maxLength="2"
            disabled={this.state.mode !== 'custom'}
            value={this.state.width}
            type="text"
            id="width-input"
            onBlur={this.verifyWidthValue}
            onChange={this.setLocalWidth}
          />
        </div>
        <div>
          <label htmlFor="height-input">Height (9-30): </label>
          <input
            className="mode-input"
            maxLength="2"
            disabled={this.state.mode !== 'custom'}
            value={this.state.height}
            type="text"
            id="height-input"
            onBlur={this.verifyHeightValue}
            onChange={this.setLocalHeight}
          />
        </div>
        <div>
          <label htmlFor="bombs-input">Mines (10-668): </label>
          <input
            className="mode-input"
            maxLength="3"
            disabled={this.state.mode !== 'custom'}
            value={this.state.bombs}
            type="text"
            id="bombs-input"
            onBlur={this.verifyBombsValue}
            onChange={this.setLocalBombs}
          />
        </div>
        <button className="mode-validate" onClick={this.pushNewMode}>OK</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.mode,
  width: state.grid.width,
  height: state.grid.height,
  bombs: state.grid.bombs
});

export const Plain = ModeDialog;
export default connect(mapStateToProps)(ModeDialog);
