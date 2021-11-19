'use strict';

module.exports = function FormatNumber(num, lang) {
  if (isNaN(num)) throw new TypeError('You did not provide a valid value to format!');
  return new Intl(lang).format(num);
};