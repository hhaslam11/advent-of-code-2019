const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(calc(val));
});

const calc = x => {
  let [wire1, wire2] = x.split('\n');
  wire1 = wire1.split(',');
  wire2 = wire2.split(',');

  let coords1 = [];
  let coords1x = 0;
  let coords1y = 0;

  let coords2 = [];
  let coords2x = 0;
  let coords2y = 0;

  let stepsTaken = 0;

  for (let i = 0; i < wire1.length; i++) {
    let direction = wire1[i][0];
    let count = parseInt(wire1[i].slice(1));

    for (let j = 0; j < parseInt(count); j++) {
      switch (direction) {
      case 'U':
        coords1y++;
        break;
      case 'D':
        coords1y--;
        break;
      case 'L':
        coords1x--;
        break;
      case 'R':
        coords1x++;
        break;
      }
      stepsTaken++;
      if (!coords1[coords1x]) coords1[coords1x] = [];
      coords1[coords1x][coords1y] = coords1[coords1x][coords1y] || stepsTaken;
    }
    
  }
  
  const ar = [];
  stepsTaken = 0;
  for (let i = 0; i < wire2.length; i++) {
    let direction = wire2[i][0];
    let count = parseInt(wire2[i].slice(1));
    
    for (let j = 0; j < parseInt(count); j++) {
      switch (direction) {
      case 'U':
        coords2y++;
        break;
      case 'D':
        coords2y--;
        break;
      case 'L':
        coords2x--;
        break;
      case 'R':
        coords2x++;
        break;
      }
      stepsTaken++;
      if (!coords2[coords2x]) coords2[coords2x] = [];
      if (coords1[coords2x] && coords1[coords2x][coords2y]) ar.push([coords2x, coords2y, stepsTaken + coords1[coords2x][coords2y]]);
    }
  }

  const sums = [];
  for (const el of ar) {
    sums.push([Math.abs(el[0]) + Math.abs(el[1]), el[2]]);
  }
  
  return sums.sort((a, b) => a[1] - b[1])[0][1];
};