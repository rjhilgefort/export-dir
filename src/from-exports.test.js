// prettier-ignore
const {
  compose, keys, prop,
} = require('ramda');
// const camelCase = require('lodash.camelcase');
const Mocks = require('../test/mocks');
const fromExports = require('./from-exports');

// NOTE: See __mocks__ directory
const mocks = Mocks();

it('applies transform on objects', () => {
  const expected = ['BAR', 'BAZ', 'FOO'];
  const actual = compose(
    keys,
    fromExports(prop('constant')),
  )(mocks.exportsObjects);
  expect(actual).toEqual(expected);
});

it('applies transform on classes', () => {
  const expected = ['BarClass', 'FooClass', 'NONStandardClass'];
  const actual = compose(
    keys,
    fromExports(prop('name')),
  )(mocks.exportsClasses);
  expect(actual).toEqual(expected);
});

it('applies transform on functions', () => {
  const expected = ['barFunc', 'bazFunc', 'fooFunc'];
  const actual = compose(
    keys,
    fromExports(prop('name')),
  )(mocks.exportsFunctions);
  expect(actual).toEqual(expected);
});

it('applies default transform on variety', () => {
  const expected = ['Class', 'func', 'OBJECT'];
  const actual = compose(
    keys,
    fromExports(null),
  )(mocks.exportsDefaults);
  expect(actual).toEqual(expected);
});
