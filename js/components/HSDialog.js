import React from 'react';

const HSDialog = ({ closeHSDialog, opened }) => (
  <div className={`dialog${opened?' opened':''}`}>
    <button className="dialog-close" onClick={closeHSDialog}>
      <i className='icon-close'></i>
    </button>
    lu
  </div>
);

export default HSDialog;
