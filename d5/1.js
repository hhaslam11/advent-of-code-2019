const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(calc(val));
});

const calc = (x) => {
  let ar = x.split('\n');

  return ar;
};