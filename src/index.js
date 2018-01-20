// prettier-ignore
const {
  compose, curry, map, filter, test, repeat, replace, __,
  allPass, equals, complement, defaultTo, curryN, fromPairs, endsWith,
  zipWith, call,
} = require('ramda')
const camelCase = require('lodash.camelcase');
const fs = require('fs');
const path = require('path');

const join2 = curryN(2, path.join);
const evolveArray = zipWith(call);

const notTestFile = complement(endsWith('test.js'));
const notIndexFile = complement(equals('index.js'));
const validExtensionR = /\.(js|json)$/;
const isValidExtension = test(validExtensionR);

// exportDir :: (String -> String) => String<Dir> -> Object
module.exports = curry((transform, dir) => {
  const transformKey = compose(
    defaultTo(camelCase, transform),
    replace(validExtensionR, ''),
  );
  const requireFile = compose(require, join2(dir));

  return compose(
    fromPairs,
    map(compose(evolveArray([transformKey, requireFile]), repeat(__, 2))),
    filter(allPass([isValidExtension, notTestFile, notIndexFile])),
    fs.readdirSync,
  )(dir);
});
