'use strict';

module.exports = function FindArrayDuplicates(array) {
  if (!Array.isArray(array)) throw new TypeError('You did not provide a valid array!');
  let result = array.filter((data, index) => (
    array.indexOf(data) !== index
  ));

  return !result.length ? null : result;
};