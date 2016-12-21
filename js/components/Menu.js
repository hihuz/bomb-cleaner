import React from 'react';

const Menu = ({ setEasyMode, setMediumMode, setHardMode, mode }) => (
  <div className="menu">
    <button
      className="mode-button"
      onClick={setEasyMode}
      disabled={mode==='easy'}
    >
      Easy
    </button>
    <button
      className="mode-button"
      onClick={setMediumMode}
      disabled={mode==='medium'}
    >
      Medium
    </button>
    <button
      className="mode-button"
      onClick={setHardMode}
      disabled={mode==='hard'}
    >
      Hard
    </button>
  </div>
);

export default Menu;
