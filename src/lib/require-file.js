// prettier-ignore
const {
  curry, compose,
} = require('ramda');
const { join2 } = require('../utils');

const requireFile = curry((dir, file) => compose(require, join2(dir))(file));

module.exports = requireFile;
