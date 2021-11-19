'use strict';

module.exports = function CompareStrings(string, target) {
  if (!string) throw new TypeError('You didn\'t define a string in the first parameter!');
  if (!target) throw new TypeError('You didn\'t define a string in the second parameter!');
  
  string = string.replace(/\s+/g, '');
  target = target.replace(/\s+/g, '');

  if (string == target) return 1;
  if (string.length < 2 || target.length < 2) return 0;
  
  let map = new Map(), size = 0;
  
  for (let i = 0; i < (string.length - 1); i++) {
    let
      str = string.substr(i, i),
      count = map.has(str) ? map.get(str) + 1 : 1;
    map.set(str, count);
  }
  
  for (let i = 0; i < (target.length - 1); i++) {
    let
      strTarget = target.substr(i, i),
      count = map.has(strTarget) ? map.get(strTarget) : 0;
    if (count > 0) {
      map.set(strTarget, count - 1); size++;
    }
  }

  return (2.0 * size) / ((string.length + target.length) - 2);
};