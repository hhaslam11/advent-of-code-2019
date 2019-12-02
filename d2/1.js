const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(a(val)[0]);
});

const a = val => {
  let ar = val.split(',');

  ar = ar.map(e => parseInt(e));

  let i = 0;

  ar[1] = 12;
  ar[2] = 2;

  while (true) {
    if (ar[i] === 99) return ar;
    if (ar[i] === 1) {
      ar[ar[i+3]] = ar[ar[i+1]] + ar[ar[i+2]];
      i += 4;
      continue;
    }
    if (ar[i] === 2) {
      ar[ar[i+3]] = ar[ar[i+1]] * ar[ar[i+2]];
      i += 4;
      continue;
    }
    
    return 'something went wrong';
  }
};