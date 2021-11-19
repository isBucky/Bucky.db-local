'use strict';

const isDate = require('./verifications/IsDate.js');

module.exports = function DaysAgo(time) {
  if (!time) throw new TypeError('You haven\'t set a time!');
  if (!isDate(time)) throw new TypeError('You have not set a valid date!');

  let
    now = new Date(),
    diff = now.getTime() - time.getTime(),
    days = Math.floor(diff / 86400000);
  return days;
};