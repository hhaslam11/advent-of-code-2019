const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  calc(val);
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

  for (let h = 0; h < height; h++) {
    let row = [];
    for (let w = 0; w < width; w++) {
      let i = 0;
      let run = true;
      while (run) {
        let bit = layers[i][h][w];
        if (bit !== 2) {
          if (bit === 1) row.push('■');
          if (bit === 0) row.push(' ');
          run = false;
        }
        i++;
      }
    }
    console.log(row.join(' '));
  }
};