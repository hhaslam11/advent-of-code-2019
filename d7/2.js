const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  const results = [];
  const allPhases = combo([5, 6, 7, 8, 9]);
  for (const i of allPhases) {
    results.push(runAmps(i, val));
  }
  
  console.log('max', Math.max(...results));
});

const runAmps = (phase, instructions) => {
  const amp1 = new Machine(instructions, phase[0], 0);
  const amp2 = new Machine(instructions, phase[1], 0);
  const amp3 = new Machine(instructions, phase[2], 0);
  const amp4 = new Machine(instructions, phase[3], 0);
  const amp5 = new Machine(instructions, phase[4], 0);

  let temp = 0;
  let result = 0;
  let done = false;

  while (!done) {
    temp = amp1.run();
    if (temp === 'DONE') {
      done = true;
      temp = result;
    } else {
      result = temp;
    }
    amp2.input = temp;
    
    temp = amp2.run();
    if (temp === 'DONE') {
      done = true;
      temp = result;
    } else {
      result = temp;
    }
    amp3.input = temp;
    
    temp = amp3.run();
    if (temp === 'DONE') {
      done = true;
      temp = result;
    } else {
      result = temp;
    }
    amp4.input = temp;

    temp = amp4.run();
    if (temp === 'DONE') {
      done = true;
      temp = result;
    } else {
      result = temp;
    }
    amp5.input = temp;

    temp = amp5.run();
    if (temp === 'DONE') {
      done = true;
      return result;
    } else {
      result = temp;
    }
    amp1.input = temp;
    
  }

  return result;
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

class Machine {
  
  constructor(instructions, input, input2) {
    this.ar = instructions.split(',').map(e => parseInt(e));
    this.i = 0;
    this.input1used = false;
    this._input1 = input;
    this._input2 = input2;
  }
  
  get input() {
    if (this.input1used) {
      return this._input2;
    } else {
      this.input1used = true;
      return this._input1;
    }
  }

  set input(input) {
    this._input2 = input;
  }

  run() {
    while (true) {
      const s = addLeadingZeros(this.ar[this.i].toString().split(''));
    
      const opcode = parseInt(s.slice(-2).join(''));
      const mode1  = parseInt(s[2]);
      const mode2  = parseInt(s[1]);
      const mode3  = parseInt(s[0]);
      const [param1, param2] = getParams(this.ar, mode2, mode1, this.i);

      if (opcode === 99) {
        this.i += 2;
        return 'DONE';
      }
    
      if (opcode === 1) {
        if (mode3) {
          //immediate mode
          this.ar[this.i + 3] = param1 + param2;
        } else {
          //position mode
          this.ar[this.ar[this.i + 3]] = param1 + param2;
        }
        this.i += 4;
        continue;
      }
    
      if (opcode === 2) {
        if (mode3) {
          //immediate mode
          this.ar[this.i + 3] = param1 * param2;
        } else {
          //position mode
          this.ar[this.ar[this.i + 3]] = param1 * param2;
        }
        this.i += 4;
        continue;
      }

      if (opcode === 3) {
        if (mode1) {
          //immediate mode
          this.ar[this.i + 1] = this.input;
        } else {
          //position mode
          this.ar[this.ar[this.i + 1]] = this.input;
        }
        this.i += 2;
        continue;
      }

      if (opcode === 4) {
        if (mode1) {
          let temp = this.ar[this.i + 1];
          this.i += 2;
          return temp;
        } else {
          let temp = this.ar[this.ar[this.i + 1]];
          this.i += 2;
          return temp;
        }
      }

      if (opcode === 5) {
        if (param1) {
          this.i = param2;
        } else {
          this.i += 3;
        }
        continue;
      }

      if (opcode === 6) {
        if (!param1) {
          this.i = param2;
        } else {
          this.i += 3;
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
          this.ar[this.i + 3] = store;
        } else {
          //position mode
          this.ar[this.ar[this.i + 3]] = store;
        }
        this.i += 4;
        continue;
      }
    
      if (opcode === 8) {
        let store = 0;
        if (param1 === param2) {
          store = 1;
        }
        if (mode3) {
          //immediate mode
          this.ar[this.i + 3] = store;
        } else {
          //position mode
          this.ar[this.ar[this.i + 3]] = store;
        }
        this.i += 4;
        continue;
      }

      console.log('** FORCE EXITING **');
      return 'DONE';
    }
  }
}

// Taken from stackoverflow
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