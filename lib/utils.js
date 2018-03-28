'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

exports.loadFile = async (basePath, filename) => {
  const filePath = path.join(basePath, filename);
  return readFileAsync(filePath, {
    encoding: 'utf8',
  });
};

exports.loadScript = async (basePath, filename) => {
  const filePath = path.join(basePath, filename);
  return require(filePath);
};
