'use strict';

module.exports = function GenerateRGB() {
  return [
    ~~(Math.random() * 255),
    ~~(Math.random() * 255),
    ~~(Math.random() * 255)
  ];
};