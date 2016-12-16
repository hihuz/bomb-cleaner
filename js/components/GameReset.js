import React from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../actions/actionCreators';

const GameReset = ({ dispatch }) => {
  function reset () {
    return dispatch(resetGame());
  }

  return (
    <div className="game-reset">
      <button className="reset-button" onClick={reset}>reset!</button>
    </div>
  );
};

export default connect()(GameReset);
