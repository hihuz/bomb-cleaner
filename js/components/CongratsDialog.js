import React from 'react';
import AddHSForm from './AddHSForm';

function isHighScore(mode, time, highScores) {
  const worseTimes = highScores[mode].filter((hs) => {
    return time <= hs.time;
  }).length;
  console.log(highScores[mode].length, worseTimes)
  return highScores[mode].length === 0 || worseTimes > 0;
}

const CongratsDialog = ({ opened, closeCongratsDialog, time, mode, highScores }) => (
  <div className={`dialog${opened?' opened':''}`}>
    <button className='dialog-close' onClick={closeCongratsDialog}>
      <i className='icon-close'></i>
    </button>
    <p>
      Congratulations !
    </p>
    {isHighScore(mode, time, highScores) ? <AddHSForm
      mode={mode}
      time={time}
      highScores={highScores}
      closeCongratsDialog={closeCongratsDialog}
    /> : ''}
  </div>
);

export default CongratsDialog;
