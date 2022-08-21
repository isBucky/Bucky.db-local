'use strict';

const DatabaseError = require('./DatabaseError.js'),
  ObjectManager = require('object.mn'),
  Manager = require('./Manager.js'),
  Config = require('./Config.js');
  
class Database {
  constructor(options) {
    options = new Config(options);
    
    this.options = options;
    Object.defineProperty(this, 'manager', {
      value: new Manager(this.options)
    });
    this.cache = new ObjectManager(this.manager.read(), options.objectNotation);
    
    this.manager.init();
  }
  
  set(...params) {
    let { path, value, callbackData } = this.#resolveParams(true, ...params);
    if (
      !(path.split(this.options.objectNotation).filter(Boolean)).length &&
      typeof value !== 'object'
    ) throw new DatabaseError('For this the value has to be an object, received:', typeof value);
    
    return this.#resolveCallback(true, callbackData, this.cache.set(path, value));
  }
  
  get(...params) {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, callbackData, this.cache.get(path));
  }
  
  update(...params) {
    let { path, value, callbackData } = this.#resolveParams(true, ...params);
    if (
      !(path.split(this.options.objectNotation).filter(Boolean)).length &&
      typeof value !== 'object'
    ) throw new DatabaseError('For this the value has to be an object, received:', typeof value);
    
    return this.#resolveCallback(true, callbackData, this.cache.update(path, value));
  }
  
  delete(...params) {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(true, callbackData, this.cache.delete(path));
  }
  
  push(...params) {
    let { path, value, callbackData } = this.#resolveParams(true, ...params);
    return this.#resolveCallback(true, callbackData, this.cache.push(path, value));
  }
  
  has(...params) {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, callbackData, this.cache.has(path));
  }
  
  all(callbackData) {
    return this.#resolveCallback(false, callbackData, this.cache.get('/'));
  }
  
  keys(...params) {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, callbackData, this.cache.keys(path));
  }
  
  values(...params) {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, callbackData, this.cache.values(path));
  }
  
  entries(...params) {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, callbackData, this.cache.entries(path));
  }
  
  toJSON(...params) {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, callbackData, this.cache.toJSON(path));
  }
  
  #resolveParams(requiredValue, ...params) {
    let [path, value, callbackData] = params;
    
    if (!path || typeof path !== 'string') throw new DatabaseError('The path has to be a string, reveived:', typeof path);
    if (requiredValue && !value && value !== 0) throw new DatabaseError('You have not set a valid value, received:', typeof value);
    if (requiredValue && typeof value == 'function') throw new DatabaseError('The value cannot be of type Function!');
    
    return { path, value, callbackData };
  }
  
  #resolveCallback(save, callbackData, data) {
    if (save) this.manager.write(this.cache.get('/'));
    if (callbackData && typeof callbackData == 'function') return callbackData(data);
    return data;
  }
}

module.exports = Database;