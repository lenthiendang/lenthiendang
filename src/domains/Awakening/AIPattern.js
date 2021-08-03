import { formatNumber } from '../../utils';

const initBetRatio = (ratios, length) => {
  const betRatio = [];
  ratios.forEach((ratio) => {
    for (let i = 0; i < length; i++) {
      betRatio.push(ratio);
    }
  });
  return betRatio;
};

const isExactCandle = (candle, prices) => {
  return (
    JSON.stringify(candle) ===
    JSON.stringify(prices.slice(prices.length - candle.length, prices.length).map((price) => price.type))
  );
};

const checkRunning = (candle, prices) => {
  return (
    JSON.stringify(candle) ===
    JSON.stringify(
      prices.slice(prices.length - (candle.length + 1), prices.length - 1).map((price) => price.type)
    )
  );
};

const checkWin = (price, betType) => {
  return price === betType;
};

const getBetData = (updatedPatterns, betAccountType) => {
  const data = {
    UP: {
      betAmount: 0,
      betAccountType,
    },
    DOWN: {
      betAmount: 0,
      betAccountType,
    },
  };
  updatedPatterns.forEach(({ pattern, betRatio, isRunning, betPos, patternPosition }) => {
    if (isRunning) {
      data[pattern[patternPosition].betType ? 'UP' : 'DOWN'].betAmount +=
        betRatio[betPos] * pattern[patternPosition].betAmount;
    }
  });
  return Object.entries(data).map(([key, value]) => ({
    ...value,
    betType: key,
  }));
};

const getLastCandles = (candles, length) =>
  candles
    .slice(length * -1)
    .map((candle) => (candle.type ? 'T' : 'G'))
    .join('');

class AIPattern {
  constructor(pattern) {
    this.condition = pattern.condition;
    this.betOrders = pattern.betOrders;
    this.betLoop = 60;
    this.betRatioInit = [1, 2.5, 6.25, 15.625, 39.0625, 99];
    this.betRatio = initBetRatio(this.betRatioInit, this.betLoop);
    this.betPos = 0;
    this.patternPos = -1;
    this.profit = 0;
    this.isActive = true;
  }

  setBetLoop(betLoop) {
    this.betLoop = betLoop;
    this.betRatio = initBetRatio(this.betRatioInit, this.betLoop);
  }

  setBetRatioInit(betRatioInit) {
    this.betRatioInit = betRatioInit;
    this.betRatio = initBetRatio(this.betRatioInit, this.betLoop);
  }

  start(candles) {
    if (
      this.isActive &&
      this.patternPos < 0 &&
      this.condition === getLastCandles(candles, this.condition.length)
    ) {
      this.patternPos = 0;
    }
    return this;
  }

  getPos() {
    return {
      type: this.betOrders[this.patternPos].betType,
      amount: this.betRatio[this.betPos] * this.betOrders[this.patternPos].betAmount,
    };
  }

  checkResult(lastCandle) {
    if (this.patternPos >= 0) {
      if (this.betPos === this.betRatio.length - 1) {
        console.log(this.betPos, this.betRatio.length);
        console.log('done');
        this.patternPos = -1;
        this.betPos = 0;
      } else if (lastCandle === this.getPos().type) {
        this.profit += this.getPos().amount * 0.95;
        if (this.betOrders.length - 1 === this.patternPos) {
          console.log(
            'win',
            this.betOrders.map((b) => (b.type ? 'T' : 'G'))
          );
          this.patternPos = -1;
          this.betPos = 0;
        } else {
          this.patternPos++;
        }
      } else {
        this.profit -= this.getPos().amount;
        this.patternPos = 0;
        this.betPos++;
      }
    }
    return this;
  }

  toggleActive() {
    console.log(this.isActive);
    this.isActive = !this.isActive;
    this.betPos = 0;
    this.patternPos = -1;
    return this;
  }
}

export default AIPattern;
