import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import GameInfos from './GameInfos';
import BombTracker from './BombTracker';
import GameReset from './GameReset';
import GameTimer from './GameTimer';

test('Snapshot', () => {
  const component = shallow(<GameInfos />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should render a BombTracker component and pass it its bombsRemaining prop', () => {
  const bombs = 12;
  const component = shallow(<GameInfos bombsRemaining={bombs} />);
  const child = component.find(BombTracker);
  expect(child.length).toEqual(1);
  expect(child.props().bombsRemaining).toEqual(bombs);
});

test('Should render a GameReset component and pass it its handleReset prop', () => {
  const reset = 'boo';
  const component = shallow(<GameInfos handleReset={reset} />);
  const child = component.find(GameReset);
  expect(child.length).toEqual(1);
  expect(child.props().reset).toEqual(reset);
});

test('Should render a GameTimer component and pass it its time prop', () => {
  const time = 90;
  const component = shallow(<GameInfos time={time} />);
  const child = component.find(GameTimer);
  expect(child.length).toEqual(1);
  expect(child.props().time).toEqual(time);
});
