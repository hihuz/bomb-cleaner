import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Overlay from './Overlay';
import ModeDialog from './ModeDialog';
import HSDialog from './HSDialog';
import AboutDialog from './AboutDialog';
import CongratsDialog from './CongratsDialog';

test('Snapshot', () => {
  const component = shallow(<Overlay />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Should call the closeDialog prop when the overlay is clicked', () => {
  const clickFn = jest.fn();
  const component = shallow(<Overlay closeDialog={clickFn} />);
  component.simulate('click', { target: '', currentTarget: '' });
  expect(clickFn).toHaveBeenCalledTimes(1);
});

test('Should not render any dialog component if dialogOpened props is false', () => {
  const component = shallow(<Overlay dialogOpened={false} />);
  expect(component.find('.dialog').children('div').length).toEqual(0);
  expect(component.find(ModeDialog).length).toEqual(0);
  expect(component.find(HSDialog).length).toEqual(0);
  expect(component.find(AboutDialog).length).toEqual(0);
  expect(component.find(CongratsDialog).length).toEqual(0);
});

test('Should render a ModeDialog component if dialogOpened props is "mode"', () => {
  const clickFn = jest.fn();
  const component = shallow(<Overlay closeDialog={clickFn} dialogOpened={'mode'} />);
  const mode = component.find(ModeDialog);
  expect(mode.length).toEqual(1);
  expect(mode.props().closeDialog).toEqual(clickFn);

  expect(component.find(HSDialog).length).toEqual(0);
  expect(component.find(AboutDialog).length).toEqual(0);
  expect(component.find(CongratsDialog).length).toEqual(0);
});

test('Should render a HSDialog component if dialogOpened props is "hs"', () => {
  const clickFn = jest.fn();
  const component = shallow(<Overlay
    closeDialog={clickFn}
    dialogOpened={'hs'}
    highScores={'foo'}
  />);
  const hs = component.find(HSDialog);
  expect(hs.length).toEqual(1);
  expect(hs.props().closeDialog).toEqual(clickFn);
  expect(hs.props().highScores).toEqual('foo');

  expect(component.find(ModeDialog).length).toEqual(0);
  expect(component.find(AboutDialog).length).toEqual(0);
  expect(component.find(CongratsDialog).length).toEqual(0);
});

test('Should render a AboutDialog component if dialogOpened props is "about"', () => {
  const clickFn = jest.fn();
  const component = shallow(<Overlay closeDialog={clickFn} dialogOpened={'about'} />);
  const about = component.find(AboutDialog);
  expect(about.length).toEqual(1);
  expect(about.props().closeDialog).toEqual(clickFn);

  expect(component.find(ModeDialog).length).toEqual(0);
  expect(component.find(HSDialog).length).toEqual(0);
  expect(component.find(CongratsDialog).length).toEqual(0);
});

test('Should render a CongratsDialog component if dialogOpened props is "congrats"', () => {
  const clickFn = jest.fn();
  const component = shallow(<Overlay
    closeDialog={clickFn}
    dialogOpened={'congrats'}
    highScores={'foo'}
    time={90}
    mode={'hard'}
  />);
  const congrats = component.find(CongratsDialog);
  expect(congrats.length).toEqual(1);
  expect(congrats.props().highScores).toEqual('foo');
  expect(congrats.props().time).toEqual(90);
  expect(congrats.props().mode).toEqual('hard');

  expect(component.find(ModeDialog).length).toEqual(0);
  expect(component.find(HSDialog).length).toEqual(0);
  expect(component.find(AboutDialog).length).toEqual(0);
});
