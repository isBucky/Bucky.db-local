'use strict';

const
  DatabaseError = require('./DatabaseError.js'),
  bucky = require('bucky.js'),
  path = require('node:path'),
  fs = require('node:fs');
  
class Manager {
  constructor(options) {
    this.directory = options.directory;
    this.serialize = options.serialize;
    this.deserialize = options.deserialize;
    this.defaults = options.defaults ?? '';
  }
  
  init() {
    try {
      let defaults = this.defaults,
        filePath = this.directory,
        directory = filePath.split('/');
        
      directory.pop();
      directory = directory.join('/');
      filePath = path.resolve(filePath);
      
      if (defaults) defaults = this.serialize(JSON.stringify(defaults, null, 2)) ?? '';
      if (directory.length && !fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
      if (!bucky.isFile(filePath) || bucky.isEmptyFile(filePath)) fs.writeFileSync(filePath, defaults);
      
      return filePath;
    } catch(err) {}
  }
  
  read() {
    this.init();
    
    if (fs.existsSync(this.directory)) {
      try {
        if (bucky.isEmptyFile(this.directory)) this.init();
        let data = fs.readFileSync(this.directory, 'utf8');
        if (!data || !data.length) return {};
        
        data = this.deserialize(data);
        return JSON.parse(JSON.stringify(data));
      } catch(err) {
        throw new DatabaseError('An error occurred while trying to read the file, make sure you haven\'t moved anything!');
      }
    }
    
    return {};
  }
  
  write(data = {}) {
    try {
      this.init();
      fs.writeFileSync(this.directory, this.serialize(
        JSON.stringify(data, null, 2)
      ) ?? '');
      return true;
    } catch(_) { return false; }
  }
}

module.exports = Manager;