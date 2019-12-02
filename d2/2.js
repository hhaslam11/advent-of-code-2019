const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (a(val, i, j)[0] === 19690720) console.log(100 * i + j);
    } 
  }
});

const a = (val, n, v) => {
  let ar = val.split(',');

  ar = ar.map(e => parseInt(e));

  let i = 0;

  ar[1] = n;
  ar[2] = v;

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