const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  const ar = val.split('\n');
  let total = 0;
  ar.forEach(el => {
    total += Math.floor(el / 3) - 2;
  });
  console.log(total);
});