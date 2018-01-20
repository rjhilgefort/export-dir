// prettier-ignore
const {
  curryN, zipWith, call
} = require('ramda');
const path = require('path');

const join2 = curryN(2, path.join);
const evolveArray = zipWith(call);

module.exports = {
  join2,
  evolveArray,
};
