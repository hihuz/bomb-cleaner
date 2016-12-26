import React from 'react';
import AddHSForm from './AddHSForm';

function isHighScore(mode, time, highScores) {
  const worseTimes = highScores[mode].filter(hs => time <= hs.time).length;
  return highScores[mode].length < 5 || worseTimes > 0;
}

const CongratsDialog = ({ opened, closeCongratsDialog, time, mode, highScores }) => (
  <div className={`dialog${opened ? ' opened' : ''}`}>
    <button className="dialog-close" onClick={closeCongratsDialog}>
      <i className="icon-close" />
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
