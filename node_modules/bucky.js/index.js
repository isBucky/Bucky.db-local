'use strict';

exports.version = require('./package.json').version;

exports.capitalizeFirstLetter = require('./src/CapitalizeFirstLetter.js');
exports.findArrayDuplicates = require('./src/FindArrayDuplicates.js');
exports.removeDupleChars = require('./src/RemoveDupleChars.js');
exports.formatSizeUnits = require('./src/FormatSizeUnits.js');
exports.compareStrings = require('./src/CompareStrings.js');
exports.similarString = require('./src/SimilarString.js');
exports.formatNumber = require('./src/FormatNumber.js');
exports.removeAcents = require('./src/RemoveAcents.js');
exports.timeFormat = require('./src/TimeFormat.js');
exports.daysAgo = require('./src/DaysAgo.js');
exports.shorten = require('./src/Shorten.js');
exports.sleep = require('./src/Sleep.js');
exports.ms = require('./src/Ms.js');

exports.generatePassword = require('./src/generators/GeneratePassword.js');
exports.generateDecimal = require('./src/generators/GenerateDecimal.js');
exports.generateHex = require('./src/generators/GenerateHex.js');
exports.generateRGB = require('./src/generators/GenerateRGB.js');

exports.isEmptyDirectory = require('./src/verifications/IsEmptyDirectory.js');
exports.isDirectory = require('./src/verifications/IsDirectory.js');
exports.isEmptyFile = require('./src/verifications/IsEmptyFile.js');
exports.isEmail = require('./src/verifications/IsEmail.js');
exports.isFile = require('./src/verifications/IsFile.js');
exports.isDate = require('./src/verifications/IsDate.js');
exports.isHex = require('./src/verifications/IsHex.js');
exports.isURL = require('./src/verifications/IsURL.js');

exports.encoder = require('./src/encryptions/Encoder.js');
exports.decoder = require('./src/encryptions/Decoder.js');
exports.compare = require('./src/encryptions/Compare.js');