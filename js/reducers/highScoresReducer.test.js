import highScoresReducer from './highScoresReducer';

test('ADD_HS: should return the passed HS object', () => {
  const hsBefore = { easy: ['foo', 'bar'], medium: ['baz'], hard: [] };
  const hsAfter = { easy: ['foo', 'bar'], medium: ['baz'], hard: ['moo'] };
  const action = { type: 'ADD_HS', highScores: hsAfter };
  expect(highScoresReducer(hsBefore, action)).toEqual(action.highScores);
});

test('unknown action should return the state as is', () => {
  const hsBefore = { easy: ['foo', 'bar'], medium: ['baz'], hard: [] };
  const action = { type: 'BOO', highScores: {} };
  expect(highScoresReducer(hsBefore, action)).toEqual(hsBefore);
});
