'use strict';

module.exports = function shorten(text, limit) {
  if (typeof text !== 'string') throw new TypeError('You have not defined a valid string!');
  if (isNaN(limit)) throw new TypeError('The limit can only be in numbers!');
  if (text.length <= limit) return text;
  return text.substr(0, limit).trim() + '...';
};