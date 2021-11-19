'use strict';

module.exports = function IsDate(date) {
  if (!date) return false;
  return date instanceof Date && !isNaN(date);
}