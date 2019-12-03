const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(calc(val));
});

const calc = (x) => {
  let [w1, w2] = x.split('\n');
  w1 = w1.split(',');
  w2 = w2.split(',');

  let c1 = [];
  let c1x = 0;
  let c1y = 0;

  let c2 = [];
  let c2x = 0;
  let c2y = 0;

  for (let i = 0; i < w1.length; i++) {
    let dir = w1[i][0];
    let count = parseInt(w1[i].slice(1));
    // console.log(cc1x, cc1y);

    if (dir === 'U') {
      for (let j = 0; j < parseInt(count); j++) {
        c1y++;
        if (!c2[c2x]) c2[c2x] = [];
        c1[c1x][c1y] = true;
      }
    } else if (dir === 'D') {
      for (let j = 0; j < parseInt(count); j++) {
        c1y--;
        if (!c2[c2x]) c2[c2x] = [];
        c1[c1x][c1y] = true;
      }
    } else if (dir === 'L') {
      for (let j = 0; j < parseInt(count); j++) {
        c1x--;
        if (!c1[c1x]) c1[c1x] = [];
        c1[c1x][c1y] = true;
      }
    } else if (dir === 'R') {
      for (let j = 0; j < parseInt(count); j++) {
        c1x++;
        if (!c1[c1x]) c1[c1x] = [];
        c1[c1x][c1y] = true;
      }
    }
  }
  let ar = [];

  for (let i = 0; i < w2.length; i++) {
    let dir = w2[i][0];
    let count = parseInt(w2[i].slice(1));

    if (dir === 'U') {
      for (let j = 0; j < parseInt(count); j++) {
        c2y++;
        if (!c2[c2x]) c2[c2x] = [];
        if (c1[c2x] && c1[c2x][c2y]) ar.push([c2x, c2y]);
      }
    } else if (dir === 'D') {
      for (let j = 0; j < parseInt(count); j++) {
        c2y--;
        if (!c2[c2x]) c2[c2x] = [];
        if (c1[c2x] && c1[c2x][c2y]) ar.push([c2x, c2y]);
      }
    } else if (dir === 'L') {
      for (let j = 0; j < parseInt(count); j++) {
        c2x--;
        if (!c2[c2x]) c2[c2x] = [];
        if (c1[c2x] && c1[c2x][c2y]) ar.push([c2x, c2y]);
      }
    } else if (dir === 'R') {
      for (let j = 0; j < parseInt(count); j++) {
        c2x++;
        if (!c2[c2x]) c2[c2x] = [];
        if (c1[c2x] && c1[c2x][c2y]) ar.push([c2x, c2y]);
      }
    }

  }

  const sums = [];
  for (let el of ar) {
    sums.push(Math.abs(el[0]) + Math.abs(el[1]));
  }
  
  return sums.sort((a, b) => a - b)[0];
};