'use strict';

const
  path = require('path'),
  { readdirSync } = require('fs');
  
module.exports = function IsEmptyDirectory(dir) {
  try {
    let data = readdirSync(path.resolve(dir));
    return !!!data?.length;
  } catch(_) {
    return true;
  }
}