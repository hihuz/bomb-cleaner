import React from 'react';
import { Plain } from './AddHSForm';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('AddHSForm snapshot', () => {
  const component = shallow(<Plain />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
})
