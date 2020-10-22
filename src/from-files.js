// prettier-ignore
const {
  curry, compose, defaultTo, replace, fromPairs, map, repeat, __,
  evolve,
} = require('ramda')
const fs = require('fs');
const camelCase = require('lodash.camelcase');
const { VALID_EXTENSION_R } = require('./lib/constants');
const filterFiles = require('./lib/filter-files');
const requireFile = require('./lib/require-file');

// fromFiles :: (String -> String) => String<Dir> -> Object
module.exports = curry((transform, dir) => {
  const transformKey = compose(
    defaultTo(camelCase, transform),
    replace(VALID_EXTENSION_R, ''),
  );

  return compose(
    fromPairs,
    map(compose(evolve([transformKey, requireFile(dir)]), repeat(__, 2))),
    filterFiles,
    fs.readdirSync,
  )(dir);
});
