import React from 'react';
import { connect } from 'react-redux';
import { setMode } from '../actions/actionCreators';

class ModeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode,
      width: "9",
      height: "9",
      bombs: "10"
    }
  }
  pushNewMode(e) {
    this.props.dispatch(setMode(
      this.state.mode,
      this.state.width,
      this.state.height,
      this.state.bombs
    ));
    this.props.closeModeDialog();
  }
  handleCloseClick(e) {
    this.setState({ mode: this.props.mode });
    this.props.closeModeDialog(e);
  }
  verifyWidthValue(e) {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 9) {
      this.setState({ width: '9' });
    }
    else if (value > 24) {
      this.setState({ width: '24' });
    }
  }
  verifyHeightValue(e) {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 9) {
      this.setState({ height: '9' });
    }
    else if (value > 30) {
      this.setState({ height: '30' });
    }
  }
  verifyBombsValue(e) {
    const value = Number(e.target.value);
    const size = this.state.width * this.state.height;
    if (isNaN(value) || value < 10) {
      this.setState({ bombs: '10' });
    }
    else if (value > 668) {
      this.setState({ bombs: '668' });
    }
    else if (value >= size) {
      this.setState({ bombs: size - 1 })
    }
  }
  setLocalEasyMode(e) {
    this.setState({ mode: 'easy' });
  }
  setLocalMediumMode(e) {
    this.setState({ mode: 'medium' });
  }
  setLocalHardMode(e) {
    this.setState({ mode: 'hard' });
  }
  setLocalCustomMode(e) {
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
  render() {
    return (
      <div className={`dialog centered-text${this.props.opened?' opened':''}`}>
        <button className='dialog-close' onClick={this.handleCloseClick.bind(this)}>
          <i className='icon-close'></i>
        </button>
          <button className='mode-dialog-button' disabled={this.state.mode === 'easy'} onClick={this.setLocalEasyMode.bind(this)}>Easy</button>
          <button className='mode-dialog-button' disabled={this.state.mode === 'medium'} onClick={this.setLocalMediumMode.bind(this)}>Medium</button>
          <button className='mode-dialog-button' disabled={this.state.mode === 'hard'} onClick={this.setLocalHardMode.bind(this)}>Hard</button>
          <button className='mode-dialog-button' disabled={this.state.mode === 'custom'} onClick={this.setLocalCustomMode.bind(this)}>Custom:</button>
          <div>
            <label>Width (9-24): </label>
            <input
              className='mode-input centered-text'
              maxLength='2'
              disabled={this.state.mode !== 'custom'}
              value={this.state.width}
              type='text'
              id='width-input'
              onBlur={this.verifyWidthValue.bind(this)}
              onChange={this.setLocalWidth.bind(this)}
            />
          </div>
          <div>
            <label>Height (9-30): </label>
            <input
              className='mode-input centered-text'
              maxLength='2'
              disabled={this.state.mode !== 'custom'}
              value={this.state.height}
              type='text'
              id='height-input'
              onBlur={this.verifyHeightValue.bind(this)}
              onChange={this.setLocalHeight.bind(this)}
            />
          </div>
          <div>
            <label>Mines (10-668): </label>
            <input
              className='mode-input centered-text'
              maxLength='3'
              disabled={this.state.mode !== 'custom'}
              value={this.state.bombs}
              type='text'
              id='bombs-input'
              onBlur={this.verifyBombsValue.bind(this)}
              onChange={this.setLocalBombs.bind(this)}
            />
          </div>
          <button className='mode-validate' onClick={this.pushNewMode.bind(this)}>OK</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ mode: state.mode });

export default connect(mapStateToProps)(ModeDialog);
