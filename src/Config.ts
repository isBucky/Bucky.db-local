'use strict';

import { DatabaseError } from "./DatabaseError";
import path from 'node:path';

/**
 * @class Config
 */
export class Config {
  public directory: string;
  public objectNotation: string;
  public serialize: (data: any) => string;
  public deserialize: (data: string) => any;
  public defaults: any;

  constructor(options: ConfigOptions) {
    if (options && typeof options !== 'object') throw new DatabaseError('Settings options have to be an object!');
    if (options && ('directory' in options) && typeof options.directory !== 'string') throw new DatabaseError('The directory has to be a string!');
    if (options && ('objectNotation' in options) && typeof options.objectNotation !== 'string') throw new DatabaseError('Provide an object notation that is a string!!');
    if (options && ('serialize' in options) && typeof options.serialize !== 'function') throw new DatabaseError('The serialize option can only be set with one function!');
    if (options && ('deserialize' in options) && typeof options.deserialize !== 'function') throw new DatabaseError('The deserialize option can only be set with one function!');
    
    /**
     * @type {string}
     * Directory where the database is located.
    */
    this.directory = path.resolve(options?.directory ?? 'Database.json');

    /**
     * @type {string}
     * Object notation.
     */
    this.objectNotation = options?.objectNotation ?? '/';
    
    /**
      * @type {Function}
      * Function used to serialize database data.
     */
    this.serialize = options?.serialize ?? (data => data);
    
    /**
     * @type {Function}
     * Function used to deserialize database data
    */
    this.deserialize = options?.deserialize ?? JSON.parse;
    
    if (!('serialize' in options) && ('deserialize' in options)) throw new DatabaseError('You didn\'t define a function to serialize, but you defined deserialize!');
    if (('serialize' in options) && !('deserialize' in options)) throw new DatabaseError('You have not defined a deserialize function, but you have defined serialize!');
    if (('defaults' in options) && typeof options.defaults !== 'object') throw new DatabaseError('The default value must be an object!');
    
    /**
      * @type {object}
      * Default values ​​to use as a base in the database.
     */
    this.defaults = options?.defaults
  }
}

export interface ConfigOptions {
  directory?: string;
  objectNotation?: string;
  serialize?: (data: any) => any;
  deserialize?: (data: any) => any;
  defaults?: object;
}