import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Menu from './Menu';

function setupButtonTest(n) {
  const openModeFn = jest.fn();
  const openHSFn = jest.fn();
  const openAboutFn = jest.fn();
  const component = shallow(<Menu
    openModeDialog={openModeFn}
    openHSDialog={openHSFn}
    openAboutDialog={openAboutFn}
  />);
  const button = component.find('.menu').children().at(n);
  button.simulate('click');
  return {
    openModeFn,
    openHSFn,
    openAboutFn
  };
}

test('Snapshot', () => {
  const component = shallow(<Menu />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should call the openModeDialog prop when the first menu button is clicked', () => {
  const testFns = setupButtonTest(0);
  expect(testFns.openModeFn).toHaveBeenCalledTimes(1);
  expect(testFns.openHSFn).toHaveBeenCalledTimes(0);
  expect(testFns.openAboutFn).toHaveBeenCalledTimes(0);
});

test('Should call the openHSDialog prop when the second menu button is clicked', () => {
  const testFns = setupButtonTest(1);
  expect(testFns.openModeFn).toHaveBeenCalledTimes(0);
  expect(testFns.openHSFn).toHaveBeenCalledTimes(1);
  expect(testFns.openAboutFn).toHaveBeenCalledTimes(0);
});

test('Should call the openAboutDialog prop when the third menu button is clicked', () => {
  const testFns = setupButtonTest(2);
  expect(testFns.openModeFn).toHaveBeenCalledTimes(0);
  expect(testFns.openHSFn).toHaveBeenCalledTimes(0);
  expect(testFns.openAboutFn).toHaveBeenCalledTimes(1);
});

