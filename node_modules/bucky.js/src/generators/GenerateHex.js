'use strict';

const generateRGB = require('./GenerateRGB.js');

module.exports = function GenerateHex() {
  let [R, G, B] = generateRGB();
  return '#' + ((1 << 24) + (R << 16) + (G << 8) + B)
    .toString(16).slice(1);
};