import React from 'react';
import ModeDialog from './ModeDialog';
import HSDialog from './HSDialog';
import AboutDialog from './AboutDialog';
import CongratsDialog from './CongratsDialog';

const Overlay = ({
  dialogOpened,
  closeDialog,
  highScores,
  time,
  mode
}) => (
  <div className={`overlay${dialogOpened ? ' opened' : ''}`}>
    <div className={`${dialogOpened ? dialogOpened + '-dialog ' : ''}dialog`}>
      {dialogOpened === 'mode' ? <ModeDialog closeDialog={closeDialog}/> : ''}
      {dialogOpened === 'hs' ? <HSDialog closeDialog={closeDialog} highScores={highScores}/> : ''}
      {dialogOpened === 'about' ? <AboutDialog closeDialog={closeDialog}/> : ''}
      {dialogOpened === 'congrats' ? <CongratsDialog
        closeDialog={closeDialog}
        time={time}
        mode={mode}
        highScores={highScores}
      /> : ''}
    </div>
  </div>
);

export default Overlay;
