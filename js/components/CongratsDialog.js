import React from 'react';
import AddHSForm from './AddHSForm';

export function isHighScore(mode, time, highScores) {
  const worseTimes = highScores[mode].filter(hs => time <= hs.time).length;
  return highScores[mode].length < 5 || worseTimes > 0;
}

const CongratsDialog = ({ closeDialog, time, mode, highScores }) => (
  <div>
    <button className="dialog-close" onClick={closeDialog}>
      <i className="icon-close" />
    </button>
    <p className="congrats-para">
      Congratulations !
    </p>
    {mode && time && highScores && isHighScore(mode, time, highScores) ? <AddHSForm
      mode={mode}
      time={time}
      highScores={highScores}
      closeDialog={closeDialog}
    /> : ''}
  </div>
);

export default CongratsDialog;
