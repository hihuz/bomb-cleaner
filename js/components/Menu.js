import React from 'react';

const Menu = ({ openModeDialog, openHSDialog, openAboutDialog }) => (
  <div className="menu">
    <button className="menu-button" onClick={openModeDialog}>Mode</button>
    <button className="menu-button" onClick={openHSDialog}>Best</button>
    <button className="menu-button" onClick={openAboutDialog}>About</button>
  </div>
);

export default Menu;
