import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import HSDialog from './HSDialog';

const testHS = {
  easy: [
    { name: 'Bob', time: 45, date: 'foo' },
    { name: 'Bah', time: 30, date: 'bar' },
  ],
  medium: [
    { name: 'Boo', time: 20, date: 'baz' },
  ],
  hard: []
};

test('Snapshot', () => {
  const component = shallow(<HSDialog highScores={testHS} />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should call the closeDialog prop when the dialog-close button is clicked', () => {
  const clickFn = jest.fn();
  const component = shallow(<HSDialog closeDialog={clickFn} highScores={testHS} />);
  component.find('button').simulate('click');
  expect(clickFn).toHaveBeenCalledTimes(1);
});

test('Should display the correct number of highscores based off highScores prop', () => {
  const component = shallow(<HSDialog highScores={testHS} />);
  const lists = component.find('ol');
  const easyList = lists.at(0);
  const mediumList = lists.at(1);
  const hardList = lists.at(2);
  expect(easyList.find('li').length).toEqual(testHS.easy.length);
  expect(mediumList.find('li').length).toEqual(testHS.medium.length);
  expect(hardList.find('li').length).toEqual(testHS.hard.length);
});

test('Should display the props of each provided highscore correctly', () => {
  const component = shallow(<HSDialog highScores={testHS} />);
  const hs = component.find('ol').at(0).find('li').at(0);
  expect(hs.find('.hs-name').text()).toEqual(testHS.easy[0].name);
  expect(hs.find('.hs-time').text()).toEqual(`${testHS.easy[0].time} secs`);
  expect(hs.find('.hs-date').text()).toEqual(testHS.easy[0].date);
});
