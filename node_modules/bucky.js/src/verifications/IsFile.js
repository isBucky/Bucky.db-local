'use strict';

const
  path = require('path'),
  { lstatSync } = require('fs');
  
module.exports = function IsFile(file) {
  try {
    let data = lstatSync(path.resolve(file));
    return data?.isFile();
  } catch(_) {
    return false;
  }
}