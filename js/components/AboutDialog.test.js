import React from 'react';
import AboutDialog from './AboutDialog';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Snapshot', () => {
  const component = shallow(<AboutDialog />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should call the closeDialog prop when the dialog-close button is clicked', () => {
  const clickFn = jest.fn();
  const component = shallow(<AboutDialog closeDialog={clickFn}/>);
  component.find('button').simulate('click');
  expect(clickFn).toHaveBeenCalledTimes(1);
});
