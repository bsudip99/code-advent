const fs = require('fs');
const util = require('util');
const path = require('path');

const readFileAsync = util.promisify(fs.readFile);

module.exports = async function (req, res) {

  const cubeNumbers = {
    'red': 12,
    'green': 13,
    'blue': 14
  };
  let sum = 0;
  // const redCube = 12;
  // const greenCube = 13;
  // const blueCube = 14;
  const directoryPath = path.dirname(__filename);
  const filePath = path.join(directoryPath, 'file.txt');

  const fileContent = await readFileAsync(filePath, 'utf8');
  let lines = fileContent.split('\n');
  const sumArray = lines.
    map((line) => {
      const part = line.split(':');
      const gameNo = Number(part[0].replace('Game',''));
      let valid = true;
      validity = part[1].trim().replaceAll(';',',').split(',').map((cube) => {
        const data = cube.trim().split(' ');
        const cubeNumber = data[0];
        const cubeType = data[1];
        if(cubeNumber > cubeNumbers[cubeType])
        {
          valid = false;
        }
      });
      if(valid == true)
      {
        sum += Number(gameNo);
      }

      return sum;
    });
    res.send(sum.toString());
};