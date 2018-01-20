// prettier-ignore
const {
  curryN, zipWith, call, complement, is,
} = require('ramda');
const path = require('path');

const join2 = curryN(2, path.join);
const evolveArray = zipWith(call);
const isNotString = complement(is(String));

module.exports = {
  join2,
  evolveArray,
  isNotString,
};
