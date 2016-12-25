import React from 'react';
import AddHSForm from './AddHSForm';

function isHighScore(mode, time, highScores) {
  return highScores[mode].filter((hs) => {
    return hs.time < time;
  }).length === 0;
}

const CongratsDialog = ({ opened, closeCongratsDialog, time, mode, highScores }) => (
  <div className={`dialog${opened?' opened':''}`}>
    <button className='dialog-close' onClick={closeCongratsDialog}>
      <i className='icon-close'></i>
    </button>
    <p>
      Congratulations !
    </p>
    {isHighScore(mode, time, highScores) ? <AddHSForm mode={mode} time={time} highScores={highScores} /> : ''}
  </div>
);

export default CongratsDialog;
