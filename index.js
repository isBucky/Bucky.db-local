const
  path = require('path'), object = require('object.mn'),
  bucky = require('bucky.js'), fs = require('fs'),
  storageSymbol = Symbol('Database storage');
  
class Database {
  constructor(directory = 'database.json', defaultOptions) {
    if (!directory || typeof directory !== 'string') throw new TypeError('Please provide a valid directory. Received:' + directory);
    if (!directory.endsWith('.json')) throw new TypeError('The directory must have a .json extension!');
    
    this.directory = _resolveDirectory(directory);
    this.defaultOptions = {
      split: defaultOptions?.split ?? '/',
      space: defaultOptions?.space ?? 2
    };
    this[storageSymbol] = _readData(this.directory);
    
    if (
      this.defaultOptions.split &&
      typeof this.defaultOptions.split !== 'string'
    ) throw new TypeError('Provide a valid split!');
  }
  
  set(path, value, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    if (!value && value !== 0) throw new TypeError('You have not provided a valid value!');
    _resolveDirectory(this.directory);
    
    let { directory, defaultOptions } = this;
    if (path == defaultOptions.split) {
      if (value !== 'object') throw new TypeError('To perform this action, the value must be an object!');
    }
    
    let data = object.set(this[storageSymbol], path, value, defaultOptions.split);
    return _resolveCallback({
      dataValues: data,
      save() {
        return _writeData(directory, data, defaultOptions);
      }
    }, callback);
  }
  
  get(path, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    _resolveDirectory(this.directory);
    
    let { split } = this.defaultOptions;
    return _resolveCallback(
      object.get(this[storageSymbol], path, split), callback
   );
  }
  
  update(path, value, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    if (!value || typeof value !== 'object') throw new TypeError('To perform this action, the value must be an object!');
    _resolveDirectory(this.directory);
    
    let
      { directory, defaultOptions } = this,
      data = object.update(this[storageSymbol], path, value, defaultOptions.split);
    return _resolveCallback({
      dataValues: data,
      save() {
        return _writeData(directory, data, defaultOptions);
      }
    }, callback);
  }
  
  delete(path, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    _resolveDirectory(this.directory);
    
    let
      { directory, defaultOptions } = this,
      data = object.delete(this[storageSymbol], path, defaultOptions.split);
    return _resolveCallback({
      dataValues: data,
      save() {
        return _writeData(directory, data, defaultOptions);
      }
    }, callback);
  }
  
  push(path, value, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    if (!value && value !== 0) throw new TypeError('You have not provided a valid value!');
    _resolveDirectory(this.directory);
    
    let
      { directory, defaultOptions } = this,
      data = object.push(this[storageSymbol], path, value, defaultOptions.split);
    return _resolveCallback({
      dataValues: data,
      save() {
        return _writeData(directory, data, defaultOptions);
      }
    }, callback);
  }
  
  has(path, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    _resolveDirectory(this.directory);
    
    let
      { split } = this.defaultOptions,
      data = object.has(this[storageSymbol], path, split);
    return _resolveCallback(data, callback);
  }
  
  all(callback) {
    return _resolveCallback(this[storageSymbol], callback);
  }
  
  keys(path, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    _resolveDirectory(this.directory);
    
    let
      { split } = this.defaultOptions,
      data = object.keys(this[storageSymbol], path, split);
    return _resolveCallback(data, callback);
  }
  
  values(path, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    _resolveDirectory(this.directory);
    
    let
      { split } = this.defaultOptions,
      data = object.values(this[storageSymbol], path, split);
    return _resolveCallback(data, callback);
  }
  
  entries(path, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    _resolveDirectory(this.directory);
    
    let
      { split } = this.defaultOptions,
      data = object.entries(this[storageSymbol], path, split);
    return _resolveCallback(data, callback);
  }
  
  toJSON(path, callback) {
    if (!path || typeof path !== 'string') throw new TypeError('Please provide a valid path!');
    _resolveDirectory(this.directory);
    
    let
      { split } = this.defaultOptions,
      data = object.toJSON(this[storageSymbol], path, split);
    return _resolveCallback(data, callback);
  }
}

function _readData(filePath) {
  if (fs.existsSync(filePath)) {
    if (bucky.isEmptyFile(filePath)) return {};
    let data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  
  _resolveDirectory(filePath);
  return {};
}

function _resolveDirectory(filePath) {
  let directorys = filePath.split('/'); directorys.pop();
  directorys = directorys.join('/');
  filePath = path.resolve(filePath);
  
  if (directorys.length && !fs.existsSync(directorys))
    fs.mkdirSync(directorys, { recursive: true });
    
  if (!bucky.isFile(filePath) || bucky.isEmptyFile(filePath))
    fs.writeFileSync(filePath, '{}');
    
  return filePath;
}

function _resolveCallback(data, callback) {
  if (callback && typeof callback == 'function')
    return callback(data);
  else return data;
}

function _writeData(filePath, data = {}, options) {
  _resolveDirectory(filePath);
  try {
    fs.writeFileSync(filePath,
      JSON.stringify(data, null, options.space)
    ); return true;
  } catch(_) {
    return false;
  }
}

exports.version = require('./package.json').version;
exports.Database = Database;