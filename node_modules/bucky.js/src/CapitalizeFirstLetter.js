'use strict';

module.exports = function CapitalizeFirstLetter(string) {
  if (!string || typeof string !== 'string') throw new TypeError('You did not provide a valid string!');

  return string.replace(/\w\S*/g, (text) => (
    text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  ));
};