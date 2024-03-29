const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(runInstructions(val));
});

const runInstructions = instructions => {
  const ar = instructions.split(',').map(e => parseInt(e));
  const input = 1;
  let i = 0;

  while (true) {
    let s = ar[i].toString();
    s = s.split('');
    while (s.length < 5) {
      s.unshift('0');
    }

    let de = parseInt(s.slice(-2).join(''));
    let c = parseInt(s[2]);
    let b = parseInt(s[1]);
    let a = parseInt(s[0]);
    let param1 = 0;
    let param2 = 0;

    if (c) {
      //immediate mode
      param1 = ar[i + 1];
    } else {
      //position
      param1 = ar[ar[i + 1]];
    }

    if (b) {
      //immediate mode
      param2 = ar[i + 2];
    } else {
      //position
      param2 = ar[ar[i + 2]];
    }

    if (de === 99) {
      return 0;
    }
    if (de === 1) {
      if (a) {
        //immediate mode
        ar[i + 3] = param1 + param2;
      } else {
        //position
        ar[ar[i + 3]] = param1 + param2;
      }
      i += 4;
      continue;
    }
    if (de === 2) {
      if (a) {
        //immediate mode
        ar[i + 3] = param1 * param2;
      } else {
        //position
        ar[ar[i + 3]] = param1 * param2;
      }
      i += 4;
      continue;
    }

    if (de === 3) {
      if (c) {
        //immediate mode
        ar[i + 1] = input;
      } else {
        //position
        ar[ar[i + 1]] = input;
      }
      i += 2;
      continue;
    }

    if (de === 4) {
      if (c) {
        //immediate mode
        if (ar[i + 1]) return ar[i + 1];
      } else {
        //position
        if (ar[ar[i + 1]]) return ar[ar[i + 1]];
      }
      i += 2;
      continue;
    }
    
    console.log('something went wrong');
    return 'ahh';
  }
};