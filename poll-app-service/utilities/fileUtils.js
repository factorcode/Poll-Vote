const fs = require('fs');
const path = require('path');

const readJSON = (filename) => {
  const filePath = path.join(__dirname, '../data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeJSON = (filename, data) => {
  const filePath = path.join(__dirname, '../data', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = { readJSON, writeJSON }