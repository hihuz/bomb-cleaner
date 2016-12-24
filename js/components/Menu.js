import React from 'react';

const Menu = ({ openModeDialog, openHSDialog, openAboutDialog }) => (
  <div className="menu">
    <button className="mode-button" onClick={openModeDialog}>Mode</button>
    <button className="hs-button" onClick={openHSDialog}>High Scores</button>
    <button className="about-button" onClick={openAboutDialog}>About</button>
  </div>
);

export default Menu;
