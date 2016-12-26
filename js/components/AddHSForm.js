import React from 'react';
import { connect } from 'react-redux';
import { addHighScore } from '../actions/actionCreators';

class AddHSForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  updateName(e) {
    this.setState({ name : e.target.value });
  }
  handleAddHSClick(e) {
    this.props.dispatch(
      addHighScore(this.props.mode, this.state.name, this.props.time, this.props.highScores)
    );
    // this is not being triggered :( rest seems more or less fine tho
    console.log(this.props.closeCongratsDialog);
    this.props.closeCongratsDialog(e);
  }
  render() {
    return (
      <div className='hs-form'>
        You made a high score for <em>{this.props.mode}</em> mode !
        <br />
        Enter your name below :
        <input type='text' onChange={this.updateName.bind(this)}/>
        <button className='' onClick={this.handleAddHSClick.bind(this)}>OK</button>
      </div>
    );
  }
}

export default connect()(AddHSForm);
