jest.mock('fs')
const fs = require('fs')
const { compose, keys } = require('ramda')
const camelCase = require('lodash.camelcase')
const upperFirst = require('lodash.upperfirst')
const Mocks = require('./test/mocks')
const exportDir = require('./index')

const upperCamelCase = compose(upperFirst, camelCase)

const LOG_HI = () => console.log('hi')

const FILE_CONTENTS = 'module.exports = () => console.log("hi")'
const MOCK_FILE_INFO = {
  '/lib/foo.js': FILE_CONTENTS,
  // '/lib/bar.js': FILE_CONTENTS,
  // '/lib/baz.js': FILE_CONTENTS,
  // '/lib/foo-file.js': FILE_CONTENTS,
  // '/lib/bar-file.js': FILE_CONTENTS,
  // '/lib/baz-file.js': FILE_CONTENTS,
}

// const fooSpy = jest.fn(LOG_HI)
jest.mock('/lib/foo', () => 'hi')
jest.mock('/lib/foo.js', () => 'hi')

beforeEach(() => {
  // eslint-disable-next-line no-underscore-dangle
  fs.__setMockFiles(MOCK_FILE_INFO)
})

it('applies default transform on "happy" files', () => {
  const expected = ['barFunc', 'bar', 'bazSomeFunc', 'baz', 'fooFunc', 'foo']
  const actual = compose(keys, exportDir(null))('/lib')
  expect(actual).toEqual(expected)
})

it('applies custom transform on "happy" files', () => {
  const expected = ['BarFunc', 'Bar', 'BazSomeFunc', 'Baz', 'FooFunc', 'Foo']
  const actual = compose(keys, exportDir(upperCamelCase))('/lib')
  expect(actual).toEqual(expected)
})
