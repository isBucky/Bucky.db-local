'use strict';

const compareStrings = require('./CompareStrings.js');

module.exports = function SimilarString(string, array) {
  if (typeof string !== 'string') throw new TypeError('You have not defined a valid string!');
  if (
    !Array.isArray(array) || !array.length ||
    array.filter(i => typeof i !== 'string').length
  ) throw new TypeError('The second parameter has to be a string and inside it can only contain strings!');
  
  let results = [], index = 0;
  for (let i = 0; i < array.length; i++) {
    let
      target = array[i],
      rating = compareStrings(string, target);
    results.push({ target, rating });
    if (rating > results[index].rating) index = i;
  }
  
  let best = results[index];
  if (!results[index].rating) {
    best = { target: false, rating: 0 };
    results = [];
  }
  return { results, best, index };
}