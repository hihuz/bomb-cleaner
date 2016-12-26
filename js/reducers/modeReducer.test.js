import modeReducer from './modeReducer';

test('SET_MODE (easy): should return the specified mode', () => {
  const action = { type: 'SET_MODE', mode: 'easy' };
  expect(modeReducer('hard', action)).toEqual('easy');
});

test('SET_MODE (medium): should return the specified mode', () => {
  const action = { type: 'SET_MODE', mode: 'medium' };
  expect(modeReducer('hard', action)).toEqual('medium');
});

test('SET_MODE (hard): should return the specified mode', () => {
  const action = { type: 'SET_MODE', mode: 'hard' };
  expect(modeReducer('easy', action)).toEqual('hard');
});

test('SET_MODE (custom): should return the specified mode', () => {
  const action = { type: 'SET_MODE', mode: 'custom' };
  expect(modeReducer('hard', action)).toEqual('custom');
});

test('unknown action should return the state as is', () => {
  const action = { type: 'WOOO', mode: 'easy' };
  expect(modeReducer('easy', action)).toEqual('easy');
  expect(modeReducer('medium', action)).toEqual('medium');
  expect(modeReducer('hard', action)).toEqual('hard');
  expect(modeReducer('custom', action)).toEqual('custom');
})
