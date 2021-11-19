'use strict';

module.exports = function IsEmail(email) {
  if (typeof email !== 'string') return false;
  return /^[\w.\+]+@\w+.\w{2,}(?:.\w{2})?$/.test(email);
};