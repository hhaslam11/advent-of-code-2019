const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(calc(val));
});

const calc = (x) => {
  const ar = x.split(',').map(e => parseInt(e));
  

  return ar;
};