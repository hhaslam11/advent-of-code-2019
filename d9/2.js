const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  if (e) console.error(e);
  const computer = new Machine(val, 2);

  console.log(computer.run());
});


class Machine {

  constructor(instructions, input) {
    this.ar = instructions.split(',').map(e => parseInt(e));
    this.i = 0;
    this._input = input;
    this._relativeBase = 0;
  }
  
  get input() {
    return this._input;
  }

  _getParams(ar, mode2, mode1) {
    let param1, param2;
  
    if (mode1 === 1) {
      //immediate mode
      param1 = ar[this.i + 1];
    } else if (mode1 === 0) {
      //position
      param1 = ar[ar[this.i + 1]];
    } else if (mode1 === 2) {
      //relative mode
      param1 = ar[this._relativeBase + ar[this.i + 1]];
    }
  
    if (mode2 === 1) {
      //immediate mode
      param2 = ar[this.i + 2];
    } else if (mode2 === 0) {
      //position
      param2 = ar[ar[this.i + 2]];
    } else if (mode2 === 2) {
      //relative mode
      param2 = ar[this._relativeBase + ar[this.i + 2]];
    }
    if (param1 === undefined) param1 = 0;
    if (param2 === undefined) param2 = 0;
    
    return [param1, param2];
  }

  _addLeadingZeros(arr) {
    const returnArray = arr;
    while (arr.length < 5) {
      returnArray.unshift('0');
    }
    
    return returnArray;
  }

  run() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.ar[this.i] === undefined) this.ar[this.i] = 0;

      const s = this._addLeadingZeros(this.ar[this.i].toString().split(''));
    
      const opcode = parseInt(s.slice(-2).join(''));
      const mode1  = parseInt(s[2]);
      const mode2  = parseInt(s[1]);
      const mode3  = parseInt(s[0]);
      const [param1, param2] = this._getParams(this.ar, mode2, mode1);

      if (opcode === 99) {
        this.i += 2;
        return 'DONE';
      }
    
      if (opcode === 1) {
        if (mode3 === 1) {
          //immediate mode
          this.ar[this.i + 3] = param1 + param2;
        } else if (mode3 === 0) {
          //position mode
          this.ar[this.ar[this.i + 3]] = param1 + param2;
        } else if (mode3 === 2) {
          //relative mode
          this.ar[this._relativeBase + this.ar[this.i + 3]] = param1 + param2;
        } else {
          console.log('something went wrong');
        }
        this.i += 4;
        continue;
      }
    
      if (opcode === 2) {
        if (mode3 === 1) {
          //immediate mode
          this.ar[this.i + 3] = param1 * param2;
        } else if (mode3 === 0) {
          //position mode
          this.ar[this.ar[this.i + 3]] = param1 * param2;
        } else if (mode3 === 2) {
          //relative mode
          this.ar[this._relativeBase + this.ar[this.i + 3]] = param1 * param2;
        } else {
          console.log('something went wrong');
        }
        
        this.i += 4;
        continue;
      }

      if (opcode === 3) {
        if (mode1 === 1) {
          //immediate mode
          this.ar[this.i + 1] = this.input;
        } else if (mode1 === 0) {
          //position mode
          this.ar[this.ar[this.i + 1]] = this.input;
        } else if (mode1 === 2) {
          //relative mode
          this.ar[this._relativeBase + this.ar[this.i + 1]] = this.input;
        } else {
          console.log('something went wrong');
        }
        this.i += 2;
        continue;
      }

      if (opcode === 4) {
        if (mode1 === 1) {
          let temp = this.ar[this.i + 1];
          this.i += 2;
          if (temp) return temp;
        } else if (mode1 === 0) {
          let temp = this.ar[this.ar[this.i + 1]];
          this.i += 2;
          if (temp) return temp;
        } else if (mode1 === 2) {
          //relative mode
          let temp = this.ar[this._relativeBase + this.ar[this.i + 1]];
          this.i += 2;
          if (temp) return temp;
        } else {
          console.log('something went wrong');
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
        if (mode3 === 1) {
          //immediate mode
          this.ar[this.i + 3] = store;
        } else if (mode3 === 0) {
          //position mode
          this.ar[this.ar[this.i + 3]] = store;
        } else if (mode3 === 2) {
          //relative mode
          this.ar[this._relativeBase + this.ar[this.i + 3]] = store;
        } else {
          console.log('something went wrong');
        }
        this.i += 4;
        continue;
      }
    
      if (opcode === 8) {
        let store = 0;
        if (param1 === param2) {
          store = 1;
        }
        if (mode3 === 1) {
          //immediate mode
          this.ar[this.i + 3] = store;
        } else if (mode3 === 0) {
          //position mode
          this.ar[this.ar[this.i + 3]] = store;
        } else if (mode3 === 2) {
          //relative mode
          this.ar[this._relativeBase + this.ar[this.i + 3]] = store;
        } else {
          console.log('something went wrong');
        }
        this.i += 4;
        continue;
      }

      if (opcode === 9) {
        this._relativeBase += param1;
        this.i += 2;
        continue;
      }
      
      console.log('** FORCE EXITING **');
      return 'DONE';
    }
  }
}