const fs = require('fs');
const util = require('util');
const path = require('path');
const { match } = require('assert');

const readFileAsync = util.promisify(fs.readFile);

module.exports = async function (req, res) {
  const numbers = [
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
  ];

  const directoryPath = path.dirname(__filename);
  const filePath = path.join(directoryPath, 'file.txt');

  const fileContent = await readFileAsync(filePath, 'utf8');
  let lines = fileContent.split('\n');

  const sumArray = lines.
    map((line) => {
      let firstStr = '';
      let lastStr = '';
      const lineArr = line.split('');
      let first = 0;
      let last = 0;
      let firstMatch = false;
      let lastMatch = false;
      for(let i = 0; i< lineArr.length && !firstMatch; i++)
      {
        if (!Number.isNaN(Number(lineArr[i]))) {
          first = lineArr[i];
          break;
        } else {
          firstStr += lineArr[i];
          for (const filter of numbers) {
            if (firstStr.includes(filter)) {
              let dataa = numbers.indexOf(filter);
              first = dataa+1;
              firstMatch = true;
              break;
            }
          }
        }
      }

      for(let j = lineArr.length -1 ; j >= 0 && !lastMatch; j--)
      {
        if (!Number.isNaN(Number(lineArr[j]))) {
          last = lineArr[j];
          break;
        } else {
          lastStr += lineArr[j];
          for (const filter of numbers) {
            if (lastStr.split('').reverse().join('').includes(filter)) {
              let dataa = numbers.indexOf(filter);
              last = (dataa+1).toString();
              lastMatch = true;
              break;
            }
          }
        }
      }
     return Number(first+last);
    });
  const sum = sumArray.reduce((a, b) => a + b, 0);
  res.send(sum.toString());
};