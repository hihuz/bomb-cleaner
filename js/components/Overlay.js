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
}) => {
  function handleKeyPress(e) {
    if (e.keyCode === 27) {
      closeDialog();
    }
  }
  function handleOverlayClick(e) {
    if (e.target !== e.currentTarget) { return; }
    closeDialog();
  }
  return (
    <div
      tabIndex="0"
      className={`overlay${dialogOpened ? ' opened' : ''}`}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyPress}
    >
      <div className={`${dialogOpened ? `${dialogOpened}-dialog ` : ''}dialog`}>
        {dialogOpened === 'mode' ? <ModeDialog closeDialog={closeDialog} /> : ''}
        {dialogOpened === 'hs' ? <HSDialog
          closeDialog={closeDialog}
          highScores={highScores}
        /> : ''}
        {dialogOpened === 'about' ? <AboutDialog closeDialog={closeDialog} /> : ''}
        {dialogOpened === 'congrats' ? <CongratsDialog
          closeDialog={closeDialog}
          time={time}
          mode={mode}
          highScores={highScores}
        /> : ''}
      </div>
    </div>
  );
};

export default Overlay;
