const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  const results = [];
  const allPhases = combo([0, 1, 2, 3, 4]);
  for (let i of allPhases) {
    results.push(runAmps(i, val));
  }
  console.log(Math.max(...results));
});

function combo(c) {
  var r = [],
      len = c.length;
      tmp = [];
  function nodup() {
    var got = {};
    for (var l = 0; l < tmp.length; l++) {
      if (got[tmp[l]]) return false;
      got[tmp[l]] = true;
    }
    return true;
  }
  function iter(col,done) {
    var l, rr;
    if (col === len) {
      if (nodup()) {
        rr = [];
        for (l = 0; l < tmp.length; l++)
          rr.push(c[tmp[l]]);
        r.push(rr);
      }
    } else {
      for (l = 0; l < len; l ++) {
        tmp[col] = l;
        iter(col +1);
      }
    }
  }
  iter(0);
  return r;
}

const runAmps = (phase, instructions) => {
  let temp = 0;
  
  for (let i = 0; i < 5; i++) {
    temp = runInstructions(instructions, phase[i], temp);
  }

  return temp;
};

const addLeadingZeros = arr => {
  const returnArray = arr;
  while (arr.length < 5) {
    returnArray.unshift('0');
  }
  return returnArray;
};

const getParams = (ar, mode2, mode1, i) => {
  let param1, param2;

  if (mode1) {
    //immediate mode
    param1 = ar[i + 1];
  } else {
    //position
    param1 = ar[ar[i + 1]];
  }

  if (mode2) {
    //immediate mode
    param2 = ar[i + 2];
  } else {
    //position
    param2 = ar[ar[i + 2]];
  }

  return [param1, param2];
};

const runInstructions = (instructions, input, input2) => {
  const ar = instructions.split(',').map(e => parseInt(e));
  
  let i = 0;
  let input1used = false;

  while (true) {
    const s = addLeadingZeros(ar[i].toString().split(''));
    
    const opcode = parseInt(s.slice(-2).join(''));
    const mode1  = parseInt(s[2]);
    const mode2  = parseInt(s[1]);
    const mode3  = parseInt(s[0]);
    const [param1, param2] = getParams(ar, mode2, mode1, i);
  
    if (opcode === 99) return 0;
    
    if (opcode === 1) {
      if (mode3) {
        //immediate mode
        ar[i + 3] = param1 + param2;
      } else {
        //position mode
        ar[ar[i + 3]] = param1 + param2;
      }
      i += 4;
      continue;
    }
    
    if (opcode === 2) {
      if (mode3) {
        //immediate mode
        ar[i + 3] = param1 * param2;
      } else {
        //position mode
        ar[ar[i + 3]] = param1 * param2;
      }
      i += 4;
      continue;
    }

    if (opcode === 3) {
      if (mode1) {
        //immediate mode
        ar[i + 1] = input;
      } else {
        //position mode
        ar[ar[i + 1]] = input;
      }
      if (!input1used) {
        input1used = true;
        input = input2;
      }
      i += 2;
      continue;
    }

    if (opcode === 4) {
      if (mode1) {
        //immediate mode
        if (ar[i + 1]) return ar[i + 1];
      } else {
        //position mode
        if (ar[ar[i + 1]]) return ar[ar[i + 1]];
      }
      i += 2;
      continue;
    }

    if (opcode === 5) {
      if (param1) {
        i = param2;
      } else {
        i += 3;
      }
      continue;
    }

    if (opcode === 6) {
      if (!param1) {
        i = param2;
      } else {
        i += 3;
      }
      continue;
    }

    if (opcode === 7) {
      let store = 0;
      if (param1 < param2) {
        store = 1;
      }
      if (mode3) {
        //immediate mode
        ar[i + 3] = store;
      } else {
        //position mode
        ar[ar[i + 3]] = store;
      }
      i += 4;
      continue;
    }
    
    if (opcode === 8) {
      let store = 0;
      if (param1 === param2) {
        store = 1;
      }
      if (mode3) {
        //immediate mode
        ar[i + 3] = store;
      } else {
        //position mode
        ar[ar[i + 3]] = store;
      }
      i += 4;
      continue;
    }

    return 'Something went wrong';
  }
};