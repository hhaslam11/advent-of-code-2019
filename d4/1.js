const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(calc(val));
});

const calc = (x) => {
  let count = 0;

  let b1 = false;
  let b2 = true;
  for (let i = 382345; i < 843167; i++) {
    let s = i.toString();
    let p = '';
    let h = 0;
    for (let j = 0; j < s.length; j++) {
      
      if (p === s[j]) b1 = true;
      if (s[j] < h) b2 = false;
      if (s[j] > h) h = s[j];
      p = s[j];
    }
    if (b1 && b2) count++;
    b1 = false;
    b2 = true;
  }

  return count;
};