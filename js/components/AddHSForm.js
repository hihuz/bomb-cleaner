import React from 'react';
import { connect } from 'react-redux';
import { addHighScore } from '../actions/actionCreators';

class AddHSForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.updateName = this.updateName.bind(this);
    this.handleAddHSClick = this.handleAddHSClick.bind(this);
  }
  updateName(e) {
    this.setState({ name: e.target.value });
  }
  handleAddHSClick() {
    const date = new Date().toJSON().slice(0, 10);
    this.props.dispatch(addHighScore(
      this.props.mode,
      this.state.name,
      this.props.time,
      date,
      this.props.highScores
    ));
    this.props.closeDialog();
  }
  render() {
    return (
      <div className="hs-form">
        You made a high score for <em>{this.props.mode}</em> mode !
        <br /><br />
        Enter your name below :
        <input type="text" onChange={this.updateName} />
        <button className="hs-validate" onClick={this.handleAddHSClick}>OK</button>
      </div>
    );
  }
}

export default connect()(AddHSForm);
