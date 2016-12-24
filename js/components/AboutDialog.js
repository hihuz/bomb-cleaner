import React from 'react';

const AboutDialog = ({ closeAboutDialog, opened }) => (
  <div className={`dialog${opened?' opened':''}`}>
    <button className='dialog-close' onClick={closeAboutDialog}>
      <i className='icon-close'></i>
    </button>
    <p>
      This is a MineSweeper game implemented with React and Redux.
      <br />
      <br />
      You can play it in the same way as the original MineSweeper.
    </p>
    <ul>
      <li>Left Click to open a tile</li>
      <li>Right Click to "flag" a tile</li>
      <li>You'll lose if you open a mine</li>
      <li>You'll win if you open all mine-free tiles</li>
    </ul>
    <p className='centered-text'>
      Good luck !
      <br />
      <br />
      <a target="_blank" href="https://twitter.com/hihuz">@hihuz</a>
    </p>
  </div>
);
export default AboutDialog;
