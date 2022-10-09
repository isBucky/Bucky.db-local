import { Config } from './Config';
'use strict';

import { DatabaseError } from './DatabaseError';
import bucky from 'bucky.js';
import path from 'node:path';
import fs from 'node:fs';

// Type
import type { ConfigOptions } from './Config';

/**
 * @class Config
 */
export class Manager {
  public directory: string;
  public serialize: (data: any) => any;
  public deserialize: (data: any) => any;
  public defaults: any;

  constructor(options: ConfigOptions) {
    /**
     * @type {string}
     * Directory where the database is located.
    */
    this.directory = options.directory!;

    /**
     * @type {Function}
     * Function used to serialize database data.
    */
    this.serialize = options.serialize!;

    /**
     * @type {Function}
     * Function used to deserialize database data
    */
    this.deserialize = options.deserialize!;

    /**
     * @type {object}
     * Default values ​​to use as a base in the database.
    */
    this.defaults = options.defaults ?? ''!;
  }
  
  /**
   * Function used to configure the database directory.
   * @return {void}
  */
  public init(): void {
    try {
      let defaults = this.defaults,
        filePath = this.directory,
        directory: any = filePath.split('/');
        
      directory.pop();
      directory = directory.join('/') as string;
      filePath = path.resolve(filePath);
      
      if (defaults) defaults = this.serialize(JSON.stringify(defaults, null, 2)) ?? '';
      if (directory.length && !fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
      if (!bucky.isFile(filePath) || bucky.isEmptyFile(filePath)) fs.writeFileSync(filePath, defaults);
    } catch(err) {}
  }
  
  /**
   * Function used to read the directory.
   * @return {object}
  */
  public read(): object {
    this.init();
    
    if (fs.existsSync(this.directory)) {
      try {
        if (bucky.isEmptyFile(this.directory)) this.init();
        let data = fs.readFileSync(this.directory, 'utf8');
        if (!data || !data.length) return {};
        
        return JSON.parse(JSON.stringify(this.deserialize(data)));
      } catch(err) {
        throw new DatabaseError('An error occurred while trying to read the file, make sure you haven\'t moved anything!');
      }
    }
    
    return {};
  }
  
  /**
   * Function used to write to the database file.
   * 
   * @param {object} [data] Value to be written
   * @return {boolean}
  */
  public write(data: object = {}): boolean {
    try {
      this.init();
      fs.writeFileSync(this.directory, this.serialize(
        JSON.stringify(data, null, 2)
      ) ?? '');
      return true;
    } catch(_) { return false; }
  }
}