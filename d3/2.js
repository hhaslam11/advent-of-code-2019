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

  let steps = 0;

  for (let i = 0; i < w1.length; i++) {
    let dir = w1[i][0];
    let count = parseInt(w1[i].slice(1));

    if (dir === 'U') {
      for (let j = 0; j < parseInt(count); j++) {
        c1y++;
        steps++;
        if (!c1[c1x]) c1[c1x] = [];
        c1[c1x][c1y] = c1[c1x][c1y] || steps;
      }
    } else if (dir === 'D') {
      for (let j = 0; j < parseInt(count); j++) {
        c1y--;
        steps++;
        if (!c1[c1x]) c1[c1x] = [];
        c1[c1x][c1y] = c1[c1x][c1y] || steps;
      }
    } else if (dir === 'L') {
      for (let j = 0; j < parseInt(count); j++) {
        c1x--;
        steps++;
        if (!c1[c1x]) c1[c1x] = [];
        c1[c1x][c1y] = c1[c1x][c1y] || steps;
      }
    } else if (dir === 'R') {
      for (let j = 0; j < parseInt(count); j++) {
        c1x++;
        steps++;
        if (!c1[c1x]) c1[c1x] = [];
        c1[c1x][c1y] = c1[c1x][c1y] || steps;
      }
    }
  }
  let ar = [];

  steps = 0;
  for (let i = 0; i < w2.length; i++) {
    let dir = w2[i][0];
    let count = parseInt(w2[i].slice(1));

    if (dir === 'U') {
      for (let j = 0; j < parseInt(count); j++) {
        steps++;
        c2y++;
        if (!c2[c2x]) c2[c2x] = [];
        if (c1[c2x] && c1[c2x][c2y]) ar.push([c2x, c2y, steps + c1[c2x][c2y]]);
      }
    } else if (dir === 'D') {
      for (let j = 0; j < parseInt(count); j++) {
        steps++;
        c2y--;
        if (!c2[c2x]) c2[c2x] = [];
        if (c1[c2x] && c1[c2x][c2y]) ar.push([c2x, c2y, steps + c1[c2x][c2y]]);
      }
    } else if (dir === 'L') {
      for (let j = 0; j < parseInt(count); j++) {
        steps++;
        c2x--;
        if (!c2[c2x]) c2[c2x] = [];
        if (c1[c2x] && c1[c2x][c2y]) ar.push([c2x, c2y, steps + c1[c2x][c2y]]);
      }
    } else if (dir === 'R') {
      for (let j = 0; j < parseInt(count); j++) {
        c2x++;
        steps++;
        if (!c2[c2x]) c2[c2x] = [];
        if (c1[c2x] && c1[c2x][c2y]) ar.push([c2x, c2y, steps + c1[c2x][c2y]]);
      }
    }

  }

  const sums = [];
  for (let el of ar) {
    sums.push([Math.abs(el[0]) + Math.abs(el[1]), el[2]]);
  }
  console.log(sums);
  return sums.sort((a, b) => a[1] - b[1])[0][1];
};