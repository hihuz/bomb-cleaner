import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BombTracker from './BombTracker';

test('Snapshot', () => {
  const component = shallow(<BombTracker />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should display the bombRemainings passed as props', () => {
  const expected = '10';
  const component = shallow(<BombTracker bombsRemaining={expected} />);
  const actual = component.find('.bomb-tracker').text();
  expect(actual).toEqual(expected);
});
