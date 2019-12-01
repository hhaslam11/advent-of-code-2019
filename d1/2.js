const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (e, val) => {
  const ar = val.split('\n');
  let total = 0;
  ar.forEach(el => {
    total += getFuel(el);
  });
  console.log(total);
});

const getFuel = (mass) => {
  const calc = Math.floor(mass / 3) - 2;
  if (calc <= 0) return 0;

  return getFuel(calc) + calc;
};