'use strict';

const
  path = require('path'),
  { lstatSync } = require('fs');
  
module.exports = function IsDirectory(dir) {
  try {
    let data = lstatSync(path.resolve(dir));
    return data?.isDirectory();
  } catch(_) {
    return false;
  }
}