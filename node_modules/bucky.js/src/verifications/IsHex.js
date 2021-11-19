'use strict';

module.exports = function IsHex(hex) {
  if (!hex) return false;
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
};