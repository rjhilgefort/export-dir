// prettier-ignore
const {
  complement, endsWith, equals, filter, allPass, test,
} = require('ramda')
const { VALID_EXTENSION_R } = require('./constants');

const notTestFile = complement(endsWith('test.js'));
const notIndexFile = complement(equals('index.js'));
const isValidExtension = test(VALID_EXTENSION_R);

const filterFiles = filter(
  allPass([isValidExtension, notTestFile, notIndexFile]),
);

module.exports = filterFiles;
