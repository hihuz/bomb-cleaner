import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Plain } from './ModeDialog';

test('Snapshot', () => {
  const component = shallow(<Plain />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should call the closeDialog prop when the dialog-close button is clicked', () => {
  const clickFn = jest.fn();
  const component = shallow(<Plain closeDialog={clickFn} />);
  component.find('.dialog-close').simulate('click');
  expect(clickFn).toHaveBeenCalledTimes(1);
});

test('Should have the mode props as default mode state', () => {
  const component = shallow(<Plain mode={'easy'} />);
  const actual = component.state('mode');
  expect(actual).toEqual('easy');
});

test('Current local state button should be disabled, other buttons should not', () => {
  const component = shallow(<Plain mode={'easy'} />);
  expect(component.find('.mode-dialog-button').at(0).props().disabled).toEqual(true);
  expect(component.find('.mode-dialog-button').at(1).props().disabled).toEqual(false);
  expect(component.find('.mode-dialog-button').at(2).props().disabled).toEqual(false);
  expect(component.find('.mode-dialog-button').at(3).props().disabled).toEqual(false);
});

test('Clicking a mode button should update the local state and should change the disabled button', () => {
  const component = shallow(<Plain mode={'easy'} />);
  expect(component.find('.mode-dialog-button').at(0).props().disabled).toEqual(true);
  expect(component.find('.mode-dialog-button').at(1).props().disabled).toEqual(false);
  component.find('.mode-dialog-button').at(1).simulate('click');
  expect(component.state('mode')).toEqual('medium');
  expect(component.find('.mode-dialog-button').at(0).props().disabled).toEqual(false);
  expect(component.find('.mode-dialog-button').at(1).props().disabled).toEqual(true);
});

test('Inputs should be disabled if mode is not custom', () => {
  const component = shallow(<Plain mode={'easy'} />);
  const inputs = component.find('input');
  expect(inputs.at(0).props().disabled).toEqual(true);
  expect(inputs.at(1).props().disabled).toEqual(true);
  expect(inputs.at(2).props().disabled).toEqual(true);
});

test('Inputs should NOT be disabled if mode is custom', () => {
  const component = shallow(<Plain mode={'custom'} />);
  const inputs = component.find('input');
  expect(inputs.at(0).props().disabled).toEqual(false);
  expect(inputs.at(1).props().disabled).toEqual(false);
  expect(inputs.at(2).props().disabled).toEqual(false);
});
