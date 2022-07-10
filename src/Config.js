'use strict';

const
  DatabaseError = require('./DatabaseError.js'),
  path = require('node:path');
  
class Config {
  constructor(options) {
    if (!options || typeof options !== 'object') throw new DatabaseError('Settings options have to be an object!');
    if (('directory' in options) && typeof options.directory !== 'string') throw new DatabaseError('The directory has to be a string!');
    if (('objectNotation' in options) && typeof options.objectNotation !== 'string') throw new DatabaseError('Provide an object notation that is a string!!');
    if (('serialize' in options) && typeof options.serialize !== 'function') throw new DatabaseError('The serialize option can only be set with one function!');
    if (('deserialize' in options) && typeof options.deserialize !== 'function') throw new DatabaseError('The deserialize option can only be set with one function!');
    
    this.directory = path.resolve(options?.directory ?? 'Database.json');
    this.objectNotation = options?.objectNotation ?? '/';
    this.serialize = options?.serialize ?? (data => data);
    this.deserialize = options?.deserialize ?? JSON.parse;
    
    if (!('serialize' in options) && ('deserialize' in options)) throw new DatabaseError('You didn\'t define a function to serialize, but you defined deserialize!');
    if (('serialize' in options) && !('deserialize' in options)) throw new DatabaseError('You have not defined a deserialize function, but you have defined serialize!');
    if (('defaults' in options) && typeof options.defaults !== 'object') throw new DatabaseError('The default value must be an object!');
    
    this.defaults = options?.defaults
  }
}

module.exports = Config;