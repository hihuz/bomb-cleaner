import React from 'react';
import ModeDialog from './ModeDialog';
import HSDialog from './HSDialog';
import AboutDialog from './AboutDialog';
import CongratsDialog from './CongratsDialog';

const Overlay = ({
  modeDialogOpened,
  closeModeDialog,
  hsDialogOpened,
  highScores,
  closeHSDialog,
  aboutDialogOpened,
  closeAboutDialog,
  congratsDialogOpened,
  closeCongratsDialog,
  time,
  mode
}) => (
  <div className="overlay">
    <ModeDialog
      opened={modeDialogOpened}
      closeModeDialog={closeModeDialog}
    />
    <HSDialog
      opened={hsDialogOpened}
      highScores={highScores}
      closeHSDialog={closeHSDialog}
    />
    <AboutDialog
      opened={aboutDialogOpened}
      closeAboutDialog={closeAboutDialog}
    />
    <CongratsDialog
      time={time}
      mode={mode}
      highScores={highScores}
      opened={congratsDialogOpened}
      closeCongratsDialog={closeCongratsDialog}
    />
  </div>
);

export default Overlay;
