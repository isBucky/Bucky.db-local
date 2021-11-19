'use strict';

const
  path = require('path'),
  { readFileSync } = require('fs');
  
module.exports = function IsEmptyFile(file) {
  try {
    let data = readFileSync(path.resolve(file), 'utf8');
    return !!!data?.length;
  } catch(_) {
    return true;
  }
}