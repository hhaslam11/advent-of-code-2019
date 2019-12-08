const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(calc(val));
});

const calc = (input) => {
  const pixels = input.split('').map(x => parseInt(x));
  const width = 25;
  const height = 6;

  const layers = [];
  
  while (pixels.length > 0) {
    let layer = [];
    for (let i = 0; i < height; i++) {
      layer[i] = pixels.splice(0, width);
    }
    layers.push(layer);
  }

  let ar = [];
  let zeroDigits = 0;
  let oneDigits = 0;
  let twoDigits = 0;
  for (let i = 0; i < layers.length; i++) {
    zeroDigits = 0;
    oneDigits = 0;
    twoDigits = 0;
    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let bit = layers[i][h][w];
        if (bit === 0) zeroDigits++;
        if (bit === 1) oneDigits++;
        if (bit === 2) twoDigits++;
        if (bit === undefined) zeroDigits++;
      }
    }
    ar.push([(oneDigits * twoDigits), zeroDigits]);
  }
  
  ar = ar.sort((a, b) => a[1] - b[1]);
  return ar[0][0];
};