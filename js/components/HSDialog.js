import React from 'react';

function displayHS(hs, i) {
  return (
    <li className="hs" key={i}>
      <div className="hs-name">{hs.name}</div>
      <div className="hs-time">{hs.time} secs</div>
      <div className="hs-date">{hs.date}</div>
    </li>
  );
}

const HSDialog = ({ closeDialog, highScores }) => (
  <div>
    <button className="dialog-close" onClick={closeDialog}>
      <i className="icon-close" />
    </button>
    <div className="hs-row">
      <h2>Easy</h2>
      <ol>
        {highScores.easy.map(displayHS)}
      </ol>
    </div>
    <div className="hs-row">
      <h2>Medium</h2>
      <ol>
        {highScores.medium.map(displayHS)}
      </ol>
    </div>
    <div className="hs-row">
      <h2>Hard</h2>
      <ol>
        {highScores.hard.map(displayHS)}
      </ol>
    </div>
  </div>
);

export default HSDialog;
