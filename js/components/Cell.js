import React from 'react';

const Cell = (props) => {


  return (
    <div className="cell" onClick={props.cellClick}>
      {props.value}
    </div>
  );
}

export default Cell;
