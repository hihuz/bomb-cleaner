import React from 'react';

const HSDialog = ({ closeHSDialog, opened }) => (
  <div className={`dialog${opened?' opened':''}`}>
    <button className="dialog-close" onClick={closeHSDialog}>x</button>
    lu
  </div>
);

export default HSDialog;
