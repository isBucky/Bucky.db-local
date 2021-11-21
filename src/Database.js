'use strict';

const
  object = require('object.mn'),
  Util = require('./Util.js');
  
const
  SymbolCache = Symbol('Cache'),
  Config = require('./Config.js'),
  DatabaseError = require('./DatabaseError.js');
  
class Database {
  constructor(options) {
    if (typeof options == 'object') options = new Config(options);
    if (options && !(options instanceof Config)) throw new DatabaseError('Settings options have to be an object!');
    
    this.Config = options ?? new Config();
    this.Util = new Util(this.Config);
    this[SymbolCache] = this.Util.read();
  }
  
  set(path, value, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    if (!value && value !== 0) throw new DatabaseError('You have not provided a valid value!');
    let { Util, Config, [SymbolCache]: cache, set } = this;
    Util.init();
    
    if (path == Config.objectNotation) {
      if (value !== 'object') throw new DatabaseError('To perform this action, the value must be an object!');
    }
    
    return Util.callback({
      dataValues: object.set(cache, path, value, Config.objectNotation),
      save() { return Util.write(cache); }
    }, callback);
  }
  
  get(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.get(this[SymbolCache], path, this.Config.objectNotation),
      callback
   );
  }
  
  update(path, value, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    if (!value || typeof value !== 'object') throw new DatabaseError('To perform this action, the value must be an object!');
    let { Util, Config, [SymbolCache]: cache } = this; Util.init();
    
    return Util.callback({
      dataValues: object.update(cache, path, value, Config.objectNotation),
      save() { return Util.write(cache); }
    }, callback);
  }
  
  delete(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    let { Util, Config, [SymbolCache]: cache } = this; Util.init();
    
    return Util.callback({
      dataValues: object.delete(cache, path, Config.objectNotation),
      save() { return Util.write(cache); }
    }, callback);
  }
  
  push(path, value, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    if (!value && value !== 0) throw new DatabaseError('You have not provided a valid value!');
    let { Util, Config, [SymbolCache]: cache } = this; Util.init();
    
    return Util.callback({
      dataValues: object.push(cache, path, value, Config.objectNotation),
      save() { return Util.write(cache); }
    }, callback);
  }
  
  has(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.has(this[SymbolCache], path, this.Config.objectNotation),
      callback
    );
  }
  
  all(callback) {
    return this.Util.callback([this[SymbolCache]], callback);
  }
  
  keys(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.keys(this[SymbolCache], path, this.Config.objectNotation),
      callback
    );
  }
  
  values(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.values(this[SymbolCache], path, this.Config.objectNotation),
      callback
    );
  }
  
  entries(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.entries(this[SymbolCache], path, this.Config.objectNotation),
      callback
    );
  }
  
  toJSON(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.toJSON(this[SymbolCache], path, this.Config.objectNotation),
      callback
    );
  }
}

module.exports = Database;