'use strict';

const
  object = require('object.mn'),
  Util = require('./Util.js'),
  path = require('path');
  
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
    
    let { Util, Config } = this; Util.init();
    
    if (path == Config.split) {
      if (value !== 'object') throw new DatabaseError('To perform this action, the value must be an object!');
    }
    
    return Util.callback({
      dataValues: object.set(this[SymbolCache], path, value, Config.split),
      save() { return Util.write(this.dataValues); }
    }, callback);
  }
  
  get(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.get(this[SymbolCache], path, this.Config.split),
      callback
   );
  }
  
  update(path, value, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    if (!value || typeof value !== 'object') throw new DatabaseError('To perform this action, the value must be an object!');
    let { Util, Config } = this; Util.init();
    
    return Util.callback({
      dataValues: object.update(this[SymbolCache], path, value, Config.split),
      save() { return Util.write(this.dataValues); }
    }, callback);
  }
  
  delete(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    let { Util, Config } = this; Util.init();
    
    return Util.callback({
      dataValues: object.delete(this[SymbolCache], path, Config.split),
      save() { return Util.write(this.dataValues); }
    }, callback);
  }
  
  push(path, value, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    if (!value && value !== 0) throw new DatabaseError('You have not provided a valid value!');
    let { Util, Config } = this; Util.init();
    
    return Util.callback({
      dataValues: object.push(this[SymbolCache], path, value, Config.split),
      save() { return Util.write(this.dataValues); }
    }, callback);
  }
  
  has(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.has(this[SymbolCache], path, this.Config.split),
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
      object.keys(this[SymbolCache], path, this.Config.split),
      callback
    );
  }
  
  values(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.values(this[SymbolCache], path, this.Config.split),
      callback
    );
  }
  
  entries(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.entries(this[SymbolCache], path, this.Config.split),
      callback
    );
  }
  
  toJSON(path, callback) {
    if (!path || typeof path !== 'string') throw new DatabaseError('Please provide a valid path!');
    this.Util.init();
    
    return this.Util.callback(
      object.toJSON(this[SymbolCache], path, this.Config.split),
      callback
    );
  }
}

module.exports = Database;