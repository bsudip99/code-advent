const fs = require('fs');
const util = require('util');
const path = require('path');

const readFileAsync = util.promisify(fs.readFile);

module.exports = async function (req, res) {

  const directoryPath = path.dirname(__filename);
  const filePath = path.join(directoryPath, 'file.txt');

  const fileContent = await readFileAsync(filePath, 'utf8');
  let lines = fileContent.split('\n');

  const sumArray = lines.
    map((line) => {
      let first = line.split('').find((value) => !Number.isNaN(Number(value)));
      let last = line.split('').reverse().find((value) => !Number.isNaN(Number(value)));
      return Number(first + last);
    });
    // res.send(sumArray);
    const sum = sumArray.reduce((a, b) => a + b, 0);
    res.send(sum.toString());
};