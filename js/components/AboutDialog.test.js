import React from 'react';
import AboutDialog from './AboutDialog';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('AboutDialog snapshot', () => {
  const component = shallow(<AboutDialog />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
})
