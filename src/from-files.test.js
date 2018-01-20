const { compose, keys } = require('ramda');
const camelCase = require('lodash.camelcase');
const upperFirst = require('lodash.upperfirst');
const Mocks = require('../test/mocks');
const exportDir = require('./from-files');

const upperCamelCase = compose(upperFirst, camelCase);

// NOTE: See __mocks__ directory
const mocks = Mocks();

it('applies default transform on "happy" files', () => {
  const expected = ['barFunc', 'bar', 'bazSomeFunc', 'baz', 'fooFunc', 'foo'];
  const actual = compose(keys, exportDir(null))(mocks.happy);
  expect(actual).toEqual(expected);
});

it('applies custom transform on "happy" files', () => {
  const expected = ['BarFunc', 'Bar', 'BazSomeFunc', 'Baz', 'FooFunc', 'Foo'];
  const actual = compose(keys, exportDir(upperCamelCase))(mocks.happy);
  expect(actual).toEqual(expected);
});
