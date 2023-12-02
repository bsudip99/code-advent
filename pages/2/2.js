const fs = require('fs');
const util = require('util');
const path = require('path');

const readFileAsync = util.promisify(fs.readFile);

module.exports = async function (req, res) {



  const directoryPath = path.dirname(__filename);
  const filePath = path.join(directoryPath, 'file.txt');

  const fileContent = await readFileAsync(filePath, 'utf8');
  let lines = fileContent.split('\n');
  let multiply = 1;
  let sum = 0;
  const sumArray = lines.
    map((line) => {
      const cubeNumbers = {
        'red': 0,
        'green': 0,
        'blue': 0
      };
      const part = line.split(':');
      const gameNo = Number(part[0].replace('Game', ''));
      validity = part[1].replaceAll(';', ',').trim().split(',').map((cube) => {
        // res.send(cube);
        const data = cube.trim().split(' ');
        const cubeNumber = Number(data[0]);
        const cubeType = data[1].trim();
        if (cubeNumbers[cubeType] < cubeNumber) {
          cubeNumbers[cubeType] = cubeNumber;
        }
      });
      const result = Object.values(cubeNumbers).reduce((a, b) => a * b, 1);
      sum += Number(result);

      return sum;
    });
  res.send(sum.toString());
};