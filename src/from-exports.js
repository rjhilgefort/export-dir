// prettier-ignore
const {
  curry, compose, fromPairs, map, adjust, repeat, __, when,
  defaultTo, prop, always, head, isEmpty, reject, anyPass,
  isNil, equals,
} = require('ramda')
const fs = require('fs');
const { isNotString } = require('./utils');
const filterFiles = require('./lib/filter-files');
const requireFile = require('./lib/require-file');

const defaultTransform = prop('name');

// TODO: refactor this implementation to be less stupid
const makeKey = curry((desired, subject) =>
  compose(
    when(isNotString, defaultTransform),
    when(isNotString, always(subject)),
    defaultTo(defaultTransform, desired),
  )(subject),
);

const hasBadKey = compose(
  anyPass([isNil, isEmpty, equals('undefined')]),
  head,
);

// fromExports :: (* -> String) => String<Dir> -> Object
module.exports = curry((transform, dir) =>
  compose(
    fromPairs,
    reject(hasBadKey),
    map(
      compose(
        adjust(0, makeKey(transform)),
        repeat(__, 2),
        requireFile(dir),
      ),
    ),
    filterFiles,
    fs.readdirSync,
  )(dir),
);
