import React from 'react';
import { connect } from 'react-redux';

const CongratsDialog = ({ opened, closeCongratsDialog }) => (
  <div className={`dialog${opened?' opened':''}`}>
    <button className='dialog-close' onClick={closeCongratsDialog}>x</button>
    <p>
      Congratulations !!!
    </p>
  </div>
);


export default connect()(CongratsDialog);
