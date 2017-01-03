import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Plain } from './AddHSForm';

test('Snapshot', () => {
  const component = shallow(<Plain />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

/*
add tests here for the logic inside addhsform

also check if we can see what props are passed to children components with shallow
*/
