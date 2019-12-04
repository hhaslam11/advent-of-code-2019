const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  console.log(calc(val));
});

const calc = (x) => {
  const [start, end] = x.split('-');

  let count = 0;

  let boolean1 = false;
  let boolean2 = true;

  for (let i = start; i < end; i++) {
    
    //i as a string for easier parsing
    let s = i.toString();
    
    let previous = '';
    let highestValue = 0;
    let repeatedNumber = 0;
    
    for (let j = 0; j < s.length; j++) {
            
      if (s[j] === previous) {
        repeatedNumber++;
      } else {
        if (repeatedNumber === 1) boolean1 = true;
        repeatedNumber = 0;
      }

      if (s[j] < highestValue) boolean2 = false;
      if (s[j] > highestValue) highestValue = s[j];

      previous = s[j];
    }
    if (repeatedNumber === 1) boolean1 = true;
    if (boolean1 && boolean2) count++;
    boolean1 = false;
    boolean2 = true;
    repeatedNumber = 0;
    
  }

  return count;
};