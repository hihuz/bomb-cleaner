import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Cell from './Cell';

const evt = {
  preventDefault() {
  }
};

test('Snapshot', () => {
  const component = shallow(<Cell />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should display as an open cell & value displayed if opened props', () => {
  const component = shallow(<Cell opened={true} value={' '} />);
  expect(component.hasClass('opened')).toEqual(true);
  expect(component.text()).toEqual(' ');
  expect(component.find('i').length).toEqual(0);
});


test('Should display as an open bomb if opened props & "X" value props', () => {
  const component = shallow(<Cell opened={true} value={'X'} />);
  expect(component.hasClass('opened')).toEqual(true);
  expect(component.hasClass('bomb')).toEqual(true);
  expect(component.find('i').length).toEqual(1);
  expect(component.find('i').hasClass('icon-bomb')).toEqual(true);
  expect(component.find('i').hasClass('icon-flagged')).toEqual(false);
});

test('Should display as a flagged cell if flagged props', () => {
  const component = shallow(<Cell opened={false} value={'X'} flagged={true} />);
  expect(component.text()).toEqual(' ');
  expect(component.hasClass('opened')).toEqual(false);
  expect(component.find('i').length).toEqual(1);
  expect(component.find('i').hasClass('icon-bomb')).toEqual(false);
  expect(component.find('i').hasClass('icon-flag')).toEqual(true);
});

test('Should NOT display as a flagged cell if flagged props and opened props', () => {
  const component = shallow(<Cell opened={true} value={3} flagged={true} />);
  expect(component.text()).toEqual('3');
  expect(component.hasClass('opened')).toEqual(true);
  expect(component.find('i').length).toEqual(0);
});

test('Should call the function passed as handleLeftClick props if the cell is left-clicked', () => {
  const fakeClickHandler = jest.fn();
  const component = shallow(<Cell handleLeftClick={fakeClickHandler} />);
  component.simulate('click', evt);
  expect(fakeClickHandler).toHaveBeenCalledTimes(1);
});

test('Should call the function passed as handleRightClick props if the cell is right-clicked', () => {
  const fakeClickHandler = jest.fn();
  const component = shallow(<Cell handleRightClick={fakeClickHandler} />);
  component.simulate('contextmenu', evt);
  expect(fakeClickHandler).toHaveBeenCalledTimes(1);
});
