const SNAKE_LENGTH = 20;
const RANDOM_CASE_POSITION = Math.floor(
  Math.random() * Math.pow(2, SNAKE_LENGTH)
);

const initPattern = (snakeLength, casePosition) => {
  const maxCase = Math.pow(2, snakeLength);

  if (casePosition >= maxCase) {
    return null;
  }

  const candle = casePosition
    .toString(2)
    .split('')
    .map((cd) => (cd === '0' ? 'G' : 'T'));

  while (candle.length < snakeLength) {
    candle.unshift('G');
  }

  return candle.join('');
};

console.log(initPattern(SNAKE_LENGTH, RANDOM_CASE_POSITION));
