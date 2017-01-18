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

test('Clicking the easy button should set the local mode to easy', () => {
  const component = shallow(<Plain mode={'medium'} />);
  expect(component.state('mode')).toEqual('medium');
  component.find('.mode-dialog-button').at(0).simulate('click');
  expect(component.state('mode')).toEqual('easy');
});

test('Clicking the hard button should set the local mode to hard', () => {
  const component = shallow(<Plain mode={'medium'} />);
  expect(component.state('mode')).toEqual('medium');
  component.find('.mode-dialog-button').at(2).simulate('click');
  expect(component.state('mode')).toEqual('hard');
});

test('Clicking the custom button should set the local mode to custom', () => {
  const component = shallow(<Plain mode={'medium'} />);
  expect(component.state('mode')).toEqual('medium');
  component.find('.mode-dialog-button').at(3).simulate('click');
  expect(component.state('mode')).toEqual('custom');
});

test('Clicking the mode-validate button should dispatch setMode action and close the dialog', () => {
  const closeFn = jest.fn();
  let fakeDispatchResult;
  const fakeDispatch = (arg) => {
    fakeDispatchResult = arg;
  };
  const component = shallow(<Plain
    dispatch={fakeDispatch}
    closeDialog={closeFn}
    mode={'easy'}
    bombs={10}
    height={15}
    width={14}
  />);
  component.find('.mode-validate').simulate('click');
  expect(fakeDispatchResult.type).toEqual('SET_MODE');
  expect(fakeDispatchResult.mode).toEqual('easy');
  expect(closeFn).toHaveBeenCalledTimes(1);
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

test('Changing width-input value should update local width', () => {
  const component = shallow(<Plain mode={'easy'} width={10} />);
  const input = component.find('#width-input');
  expect(component.state('width')).toEqual(10);
  input.simulate('change', { target: { value: 20 } });
  expect(component.state('width')).toEqual(20);
});

test('Changing height-input value should update local height', () => {
  const component = shallow(<Plain mode={'easy'} height={15} />);
  const input = component.find('#height-input');
  expect(component.state('height')).toEqual(15);
  input.simulate('change', { target: { value: 30 } });
  expect(component.state('height')).toEqual(30);
});

test('Changing bombs-input value should update local bombs', () => {
  const component = shallow(<Plain mode={'easy'} bombs={20} />);
  const input = component.find('#bombs-input');
  expect(component.state('bombs')).toEqual(20);
  input.simulate('change', { target: { value: 35 } });
  expect(component.state('bombs')).toEqual(35);
});

test('Bluring width-input value should call verifyWidthValue and validate the input', () => {
  const component = shallow(<Plain mode={'easy'} width={10} />);
  const input = component.find('#width-input');
  expect(component.state('width')).toEqual(10);
  input.simulate('blur', { target: { value: 'ezae' } });
  expect(component.state('width')).toEqual(9);
  input.simulate('blur', { target: { value: 3 } });
  expect(component.state('width')).toEqual(9);
  input.simulate('blur', { target: { value: 35 } });
  expect(component.state('width')).toEqual(24);
});

test('Bluring height-input value should call verifyHeightValue and validate the input', () => {
  const component = shallow(<Plain mode={'easy'} height={10} />);
  const input = component.find('#height-input');
  expect(component.state('height')).toEqual(10);
  input.simulate('blur', { target: { value: 'xxx' } });
  expect(component.state('height')).toEqual(9);
  input.simulate('blur', { target: { value: 3 } });
  expect(component.state('height')).toEqual(9);
  input.simulate('blur', { target: { value: 35 } });
  expect(component.state('height')).toEqual(30);
});

test('Bluring bombs-input value should call verifyBombsValue and validate the input', () => {
  const component = shallow(<Plain mode={'easy'} bombs={10} width={10} height={10} />);
  const input = component.find('#bombs-input');
  expect(component.state('bombs')).toEqual(10);
  input.simulate('blur', { target: { value: 'xxx' } });
  expect(component.state('bombs')).toEqual(10);
  input.simulate('blur', { target: { value: 999 } });
  expect(component.state('bombs')).toEqual(99);
});

test('Bluring bombs-input value should call verifyBombsValue and validate the input 2', () => {
  const component = shallow(<Plain mode={'easy'} bombs={10} width={24} height={30} />);
  const input = component.find('#bombs-input');
  expect(component.state('bombs')).toEqual(10);
  input.simulate('blur', { target: { value: 3 } });
  expect(component.state('bombs')).toEqual(10);
  input.simulate('blur', { target: { value: 999 } });
  expect(component.state('bombs')).toEqual(668);
});
