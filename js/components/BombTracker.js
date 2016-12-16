import React from 'react';
import { connect } from 'react-redux';

const BombTracker = (props) => (
  <div className="bomb-tracker">
    {props.bombsRemaining}
  </div>
);

const mapStateToProps = (state) => {
  return { bombsRemaining: state.grid.bombs - state.grid.flags };
};

export default connect(mapStateToProps)(BombTracker);
