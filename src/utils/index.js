// prettier-ignore
const {
  curryN, complement, is,
} = require('ramda');
const path = require('path');

const join2 = curryN(2, path.join);
const isNotString = complement(is(String));

module.exports = {
  join2,
  isNotString,
};
