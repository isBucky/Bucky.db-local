'use strict';

module.exports = function RemoveDupleChars(string, count = 1) {
  if (typeof string !== 'string') throw new TypeError('You have not defined a valid string!');
  if (isNaN(count)) throw new TypeError('The count can only be numbers!');

  return string.split('')
    .filter((_, i, b) => b[i] != b[i + count])
    .join('');
};