const { keys } = require('ramda');
const exportDir = require('./index');

// TODO: Could be more robust and check that they are functions
//       with a specific arity and blah blah blah
it('exports documented interface', () => {
  const actual = ['fromFiles', 'fromExports'];
  const expected = keys(exportDir);
  expect(actual).toEqual(expected);
});
