'use strict';

import { Config, ConfigOptions } from './Config';
import { DatabaseError } from './DatabaseError';
import { Manager } from './Manager';

import ObjectManager from 'object.mn';

export class Database {
  public options: ConfigOptions;
  public cache: ObjectManager;
  private manager!: Manager;

  constructor(options: ConfigOptions) {
    options = new Config(options);
    
    Object.defineProperty(this, 'manager', {
      value: new Manager(options)
    });

    this.options = options;
    this.cache = new ObjectManager(this.manager.read(), options.objectNotation);
    
    this.manager.init();
  }
  
  public set(...params: [string, any, Function?]): any {
    let { path, value, callbackData } = this.#resolveParams(true, ...params);
    if (
      !(path.split(this.options.objectNotation!).filter(Boolean)).length &&
      typeof value !== 'object'
    ) throw new DatabaseError('For this the value has to be an object, received:', typeof value);
    
    return this.#resolveCallback(true, this.cache.set(path, value), callbackData);
  }
  
  public get(...params: [string, Function?]): any {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, this.cache.get(path), callbackData);
  }
  
  public update(...params: [string, any, Function?]): any {
    let { path, value, callbackData } = this.#resolveParams(true, ...params);
    if (
      !(path.split(this.options.objectNotation!).filter(Boolean)).length &&
      typeof value !== 'object'
    ) throw new DatabaseError('For this the value has to be an object, received:', typeof value);
    
    return this.#resolveCallback(true, this.cache.update(path, value), callbackData);
  }
  
  public delete(...params: [string, Function?]): any {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(true, this.cache.delete(path), callbackData);
  }
  
  public push(...params: [string, any, Function?]): any[] {
    let { path, value, callbackData } = this.#resolveParams(true, ...params);
    return this.#resolveCallback(true, this.cache.push(path, value), callbackData);
  }
  
  public has(...params: [string, Function?]): boolean {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, this.cache.has(path), callbackData);
  }
  
  public all(callbackData?: Function) {
    return this.#resolveCallback(false, callbackData, this.cache.get('/'));
  }
  
  public keys(...params: [string, Function?]): string[] {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, this.cache.keys(path), callbackData);
  }
  
  public values(...params: [string, Function?]): string[] {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, this.cache.values(path), callbackData);
  }
  
  public entries(...params: [string, Function?]): any[][] {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, this.cache.entries(path), callbackData);
  }
  
  public toJSON(...params: [string, Function?]): string {
    let { path, callbackData } = this.#resolveParams(false, ...params);
    return this.#resolveCallback(false, this.cache.toJSON(path), callbackData);
  }
  
  #resolveParams(requiredValue: boolean, ...params: [string, any, Function?]): { path: string; value: any; callbackData?: Function } {
    let [path, value, callbackData] = params;
    
    if (!path || typeof path !== 'string') throw new DatabaseError('The path has to be a string, reveived:', typeof path);
    if (requiredValue && !value && value !== 0) throw new DatabaseError('You have not set a valid value, received:', typeof value);
    if (requiredValue && typeof value == 'function') throw new DatabaseError('The value cannot be of type Function!');
    
    return { path, value, callbackData };
  }
  
  #resolveCallback(save: boolean, data: any, callbackData?: Function): any {
    if (save) this.manager.write(this.cache.get('/'));
    if (callbackData && typeof callbackData == 'function') return callbackData(data);
    return data;
  }
}