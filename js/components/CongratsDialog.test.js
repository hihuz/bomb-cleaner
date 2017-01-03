import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import AddHSForm from './AddHSForm';
import CongratsDialog, { isHighScore } from './CongratsDialog';

const emptyHS = { easy: [], medium: [], hard: [] };
const fullEasyHS = {
  easy: [
    { time: 10 },
    { time: 11 },
    { time: 12 },
    { time: 97 },
    { time: 98 }
  ],
  medium: [],
  hard: []
};

test('Snapshot', () => {
  const component = shallow(<CongratsDialog />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should render a AddHSForm component when props give a new valid high score', () => {
  const component = shallow(<CongratsDialog
    mode={'easy'}
    time={70}
    highScores={emptyHS}
  />);
  const actual = component.find(AddHSForm).length;
  expect(actual).toEqual(1);
});

test('Should NOT render a AddHSForm component when props give an invalid high score', () => {
  const component = shallow(<CongratsDialog
    mode={'easy'}
    time={999}
    highScores={fullEasyHS}
  />);
  const actual = component.find(AddHSForm).length;
  expect(actual).toEqual(0);
});

test('Should call the closeDialog prop when the dialog-close button is clicked', () => {
  const clickFn = jest.fn();
  const component = shallow(<CongratsDialog closeDialog={clickFn} />);
  component.find('button').simulate('click');
  expect(clickFn).toHaveBeenCalledTimes(1);
});

test('isHighScore (empty): should return true', () => {
  const actual = isHighScore('easy', 99, emptyHS);
  expect(actual).toEqual(true);
});

test('isHighScore (full / worse score): should return false', () => {
  const actual = isHighScore('easy', 99, fullEasyHS);
  expect(actual).toEqual(false);
});

test('isHighScore (not full / worse score): should return true', () => {
  const hs = Object.assign({}, emptyHS, { easy: [
    { time: 10 },
    { time: 11 },
    { time: 97 },
  ] });
  const actual = isHighScore('easy', 99, hs);
  expect(actual).toEqual(true);
});

test('isHighScore (full / better score): should return true', () => {
  const actual = isHighScore('easy', 96, fullEasyHS);
  expect(actual).toEqual(true);
});

test('isHighScore (not full / better score): should return true', () => {
  const hs = Object.assign({}, emptyHS, { easy: [
    { time: 10 },
    { time: 11 },
    { time: 50 },
    { time: 98 },
  ] });
  const actual = isHighScore('easy', 97, hs);
  expect(actual).toEqual(true);
});
