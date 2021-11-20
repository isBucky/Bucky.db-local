'use strict';

const
  DatabaseError = require('./DatabaseError.js'),
  path = require('node:path');
  
class Config {
  constructor(options) {
    if (options && typeof options !== 'object') throw new DatabaseError('Settings options have to be an object!');
    this.directory = path.resolve(options?.directory ?? 'Database.json');
    
    if (options?.split && typeof options.split !== 'string') throw new DatabaseError('Provide an object notation that is a string!!');
    this.objectNotation = options?.objectNotation ?? '/';
    
    if (options?.serialize && typeof options?.serialize !== 'function') throw new DatabaseError('The serialize option can only be set with one function!');
    this.serialize = options?.serialize ?? (data => data);
    
    if (options?.deserialize && typeof options?.deserialize !== 'function') throw new DatabaseError('The deserialize option can only be set with one function!');
    this.deserialize = options?.deserialize ?? JSON.parse;
    
    if (options?.defaults && typeof options?.defaults !== 'object') throw new DatabaseError('The default value must be an object!');
    this.defaults = options?.defaults
  }
}

module.exports = Config;