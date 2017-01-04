import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import GameReset from './GameReset';

test('Snapshot', () => {
  const component = shallow(<GameReset />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should call the reset prop when the reset-button is clicked', () => {
  const clickFn = jest.fn();
  const component = shallow(<GameReset reset={clickFn} />);
  component.find('button').simulate('click');
  expect(clickFn).toHaveBeenCalledTimes(1);
});
