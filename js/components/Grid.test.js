import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Plain } from './Grid';
import Cell from './Cell';

function makeTestGrid(gridSize) {
  const size = gridSize || 20;
  const testGridProp = {
    width: 1,
    height: 1,
    cells: new Array(size).fill(undefined).map((cell, i) => ({ index: i }))
  };
  return shallow(<Plain grid={testGridProp} />);
}

test('Snapshot', () => {
  const component = makeTestGrid();
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should render a number of cells based off grid.cells prop', () => {
  const gridSize = 80;
  const component = makeTestGrid(gridSize);
  expect(component.find(Cell).length).toEqual(gridSize);
});
