import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import GameTimer from './GameTimer';

test('Snapshot', () => {
  const component = shallow(<GameTimer />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should display the time passed as prop', () => {
  const expected = '99';
  const component = shallow(<GameTimer time={expected} />);
  const actual = component.find('.game-timer').text();
  expect(actual).toEqual(expected);
});
