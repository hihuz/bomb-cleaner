import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';

const Grid = (props) => {
  function handleCellClick(e) {
    //put the logic here for clicks
    console.log(e);
  }

  return (
    <div className="grid">
      {props.cells.map((cell, index) => {
        return (
          <Cell key={index} cellClick={handleCellClick} {...cell}  />
        );
      })}
    </div>
  );

}

const mapStateToProps = (state) => state.grid;

export default connect(mapStateToProps)(Grid);
