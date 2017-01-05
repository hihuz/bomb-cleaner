import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Plain } from './AddHSForm';

test('Snapshot', () => {
  const component = shallow(<Plain />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should call the handleAddHSClick method when the hs-validate button is clicked', () => {
  const closeFn = jest.fn();
  let fakeDispatchResult;
  const fakeDispatch = (arg) => {
    fakeDispatchResult = arg;
  };
  const component = shallow(<Plain
    mode={'easy'}
    time={45}
    highScores={{ easy: [], medium: [], hard: [] }}
    dispatch={fakeDispatch}
    closeDialog={closeFn}
  />);
  component.find('button').simulate('click');
  // handleAddHSClick should call the addHighScore action creator and close the dialog window
  expect(fakeDispatchResult.type).toEqual('ADD_HS');
  expect(closeFn).toHaveBeenCalledTimes(1);
});

test('Should display the mode recieved as props', () => {
  const mode = 'moo';
  const component = shallow(<Plain mode={mode} />);
  const actual = component.find('em').text();
  expect(actual).toEqual(mode);
});

test('Should have an empty string as default state', () => {
  const component = shallow(<Plain />);
  const actual = component.state('name');
  expect(actual).toEqual('');
});

test('Change event on the input should update the component state', () => {
  const component = shallow(<Plain />);
  const expected = 'testName';
  component.find('input').simulate('change', { target: { value: expected } });
  const actual = component.state('name');
  expect(actual).toEqual(expected);
});
