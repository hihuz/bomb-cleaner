import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Plain } from './Grid';
import Cell from './Cell';

function makeTestGrid(size = 20, status = 'running', flagged = false, opened = false, dispatch = {}) {
  const testGridProp = {
    width: 1,
    height: 1,
    cells: new Array(size).fill(undefined).map((cell, i) => ({
      index: i,
      flagged,
      opened,
      value: 2
    }))
  };
  return shallow(<Plain
    grid={testGridProp}
    status={status}
    {...dispatch}
  />);
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

test('Should pass cell props correctly to child Cell component', () => {
  const gridSize = 1;
  const component = makeTestGrid(gridSize);
  const child = component.find(Cell);
  const childProps = child.props();
  expect(child.length).toEqual(gridSize);
  expect(childProps.index).toEqual(0);
  expect(childProps.flagged).toEqual(false);
  expect(childProps.opened).toEqual(false);
  expect(childProps.value).toEqual(2);
  expect(childProps.handleLeftClick).toBeDefined();
  expect(childProps.handleRightClick).toBeDefined();
});

test('Should NOT pass handleLeftClick/handleRightClick to an opened cell', () => {
  const component = makeTestGrid(1, 'running', false, true);
  const child = component.find(Cell);
  const childProps = child.props();
  expect(childProps.handleLeftClick).toBeUndefined();
  expect(childProps.handleRightClick).toBeUndefined();
});

test('Should NOT pass handleLeftClick to a flagged cell, but should pass handleRightClick', () => {
  const component = makeTestGrid(1, 'running', true, false);
  const child = component.find(Cell);
  const childProps = child.props();
  expect(childProps.handleLeftClick).toBeUndefined();
  expect(childProps.handleRightClick).toBeDefined();
});

test('Should NOT pass handleLeftClick/handleRightClick if the game is won', () => {
  const component = makeTestGrid(1, 'won', false, false);
  const child = component.find(Cell);
  const childProps = child.props();
  expect(childProps.handleLeftClick).toBeUndefined();
  expect(childProps.handleRightClick).toBeUndefined();
});

test('Should NOT pass handleLeftClick/handleRightClick if the game is lost', () => {
  const component = makeTestGrid(1, 'lost', false, false);
  const child = component.find(Cell);
  const childProps = child.props();
  expect(childProps.handleLeftClick).toBeUndefined();
  expect(childProps.handleRightClick).toBeUndefined();
});

test('handleLeftClickMethod should dispatch initGame when status is init', () => {
  const initFunc = jest.fn();
  const cellFunc = jest.fn();
  const bombFunc = jest.fn();
  const toggleFunc = jest.fn();
  const component = makeTestGrid(20, 'init', false, false, {
    dispatchInitGame: initFunc,
    dispatchOpenCell: cellFunc,
    dispatchOpenBomb: bombFunc,
    dispatchToggleFlag: toggleFunc
  });
  component.instance().handleLeftClick(0, '1');
  expect(initFunc).toHaveBeenCalledTimes(1);
  expect(cellFunc).toHaveBeenCalledTimes(0);
  expect(bombFunc).toHaveBeenCalledTimes(0);
  expect(toggleFunc).toHaveBeenCalledTimes(0);
});

test('handleLeftClickMethod should dispatch openCell when value is not X', () => {
  const initFunc = jest.fn();
  const cellFunc = jest.fn();
  const bombFunc = jest.fn();
  const toggleFunc = jest.fn();
  const component = makeTestGrid(20, 'running', false, false, {
    dispatchInitGame: initFunc,
    dispatchOpenCell: cellFunc,
    dispatchOpenBomb: bombFunc,
    dispatchToggleFlag: toggleFunc
  });
  component.instance().handleLeftClick(0, ' ');
  expect(initFunc).toHaveBeenCalledTimes(0);
  expect(cellFunc).toHaveBeenCalledTimes(1);
  expect(bombFunc).toHaveBeenCalledTimes(0);
  expect(toggleFunc).toHaveBeenCalledTimes(0);
});

test('handleLeftClickMethod should dispatch openBomb when value is X', () => {
  const initFunc = jest.fn();
  const cellFunc = jest.fn();
  const bombFunc = jest.fn();
  const toggleFunc = jest.fn();
  const component = makeTestGrid(20, 'running', false, false, {
    dispatchInitGame: initFunc,
    dispatchOpenCell: cellFunc,
    dispatchOpenBomb: bombFunc,
    dispatchToggleFlag: toggleFunc
  });
  component.instance().handleLeftClick(0, 'X');
  expect(initFunc).toHaveBeenCalledTimes(0);
  expect(cellFunc).toHaveBeenCalledTimes(0);
  expect(bombFunc).toHaveBeenCalledTimes(1);
  expect(toggleFunc).toHaveBeenCalledTimes(0);
});

test('handleRightClickMethod should dispatch toggleFlag', () => {
  const initFunc = jest.fn();
  const cellFunc = jest.fn();
  const bombFunc = jest.fn();
  const toggleFunc = jest.fn();
  const component = makeTestGrid(20, 'running', false, false, {
    dispatchInitGame: initFunc,
    dispatchOpenCell: cellFunc,
    dispatchOpenBomb: bombFunc,
    dispatchToggleFlag: toggleFunc
  });
  component.instance().handleRightClick(0, '4');
  expect(initFunc).toHaveBeenCalledTimes(0);
  expect(cellFunc).toHaveBeenCalledTimes(0);
  expect(bombFunc).toHaveBeenCalledTimes(0);
  expect(toggleFunc).toHaveBeenCalledTimes(1);
});
