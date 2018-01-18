jest.mock('fs')
// prettier-ignore
const { compose, keys } = require('ramda')
const fs = require('fs')

const exportDir = require('./index')

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

describe('exportDir', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    fs.__setMockFiles(MOCK_FILE_INFO)
  })

  it('includes all files in the directory in the summary', () => {
    const expected = ['foo', 'bar', 'baz', 'fooFile', 'barFile', 'bazFile']
    const actual = compose(keys, exportDir(null))('/lib')
    expect(actual).toBe(expected)
  })
})
