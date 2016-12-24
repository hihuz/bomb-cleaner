import React from 'react';
import { connect } from 'react-redux';

const CongratsDialog = ({ opened, closeCongratsDialog }) => (
  <div className={`dialog${opened?' opened':''}`}>
    <button className='dialog-close' onClick={closeCongratsDialog}>
      <i className='icon-close'></i>
    </button>
    <p>
      Congratulations !!!
    </p>
  </div>
);


export default connect()(CongratsDialog);
