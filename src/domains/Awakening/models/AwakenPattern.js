import { betConditionUnGroupRegExp, PATTERN_TYPE } from '../awakeningUtil';
import AwakeningInstance from './AwakeningInstance';

const initBetRatio = (ratios, betLoop) => {
  const betRatio = [];
  if (Array.isArray(betLoop) && betLoop.length === ratios.length) {
    betLoop.forEach((length, i) => {
      betRatio.push(...new Array(length).fill(ratios[i]));
    });
  } else {
    const length = Array.isArray(betLoop) ? betLoop[0] : Number(betLoop);
    ratios.forEach((ratio) => {
      betRatio.push(...new Array(length).fill(ratio));
    });
  }
  return betRatio;
};


const getLastCandles = (candles, length) =>
  candles
    .slice(length * -1)
    .map((candle) => (candle.type ? 'T' : 'G'));

const getLastCandlesString = (candles, length) => getLastCandles(candles, length).join('');


class AwakenPattern {
  constructor(pattern) {
    this.id=pattern.id;
    this.type = pattern.type || PATTERN_TYPE.PAROLI;
    this.isActive = pattern.isActive || false;
    this.condition = pattern.condition;
    this.conditionGroupType = this.getConditionGroupType(pattern.condition);
    this.betOrders = pattern.betOrders;
    this.betLoop = pattern.betLoop || 0; // số lần thua trước khi bắt đầu quá trình khác (paroli)
    this.betRatioInit = pattern.betRatios || [1];
    this.betRatio = initBetRatio(this.betRatioInit, this.betLoop);
    this.betRatioPos = 0;
    this.patternPos = 0;
    this.profit = 0;
    this.isRunning = false;
    this.winCount = 0;
    this.loseCount = 0;
    this.maxWinCount = pattern.maxWinCount;
    this.betOrderUpdatedCount = 0;
    this.calculateProfit = '';
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
      !this.isRunning &&
      this.condition === getLastCandlesString(candles, this.condition.length)
    ) {
      //should bet here
      this.isRunning = true;
    }
    return this;
  }

  getPos() {
    return {
      type: this.betOrders[this.patternPos].betType,
      amount: this.betRatio[this.betRatioPos] * this.betOrders[this.patternPos].betAmount
    };
  }

  getConditionGroupType() {
    return this.condition.match(betConditionUnGroupRegExp)
      .reduce((acc, current) => acc += `${current.length}${current.charAt(0)}`, '')
  }

  checkResult(candles) {
    if (this.type === PATTERN_TYPE.PAROLI) {
      this.checkParoliResult(candles);
    } else {
      this.checkMartingaleResult(candles);
    }
    return this;
  }

  checkParoliResult(candles) {
    const lastCandle = candles[candles.length - 1];
    if (this.isRunning) {
      if (lastCandle.type === this.getPos().type) {
        this.handleParoliBetSuccess();
      } else {
        this.handleParoliBetFailed();
      }
    }
    return this;
  }

  handleDoneProcess() {
    console.log('Done process paroli because maximum of betLoop');
    this.isActive = false;
    this.isRunning = false;
    this.patternPos = 0;
    this.betRatioPos = 0;
    return this;
  }

  handleParoliBetSuccess() {
    this.profit += this.getPos().amount * 0.95;
    this.calculateProfit += ` + ${Number((this.getPos().amount * 0.95).toFixed(2))}`;
    if (this.betOrders.length - 1 === this.patternPos) {
      console.log(
        `Done process paroli `,
        this.betOrders.map((b) => (b.type ? 'T' : 'G'))
      );
      this.winCount++;
      this.isActive = false;
      this.isRunning = false;
      this.patternPos = 0;
      this.betRatioPos = 0;
    } else {
      this.patternPos++;
    }
  }

  handleParoliBetFailed() {
    this.profit -= this.getPos().amount;
    this.calculateProfit += ` - ${Number((this.getPos().amount).toFixed(2))}`;
    this.loseCount++;
    if (this.betRatioPos === this.betRatio.length - 1) {
      this.handleDoneProcess();
    } else {
      this.isRunning = false;
      this.patternPos = 0;
      this.betRatioPos++;
    }
  }

  checkMartingaleResult(candles) {
    const lastCandle = candles[candles.length - 1];
    if (this.isRunning) {
      if (lastCandle.type === this.betOrders[this.patternPos].betType) {
        this.handleMartingaleBetSuccess(candles);
      } else {
        this.handleMartingaleBetFailed();
      }
    }
    return this;
  }

  handleMartingaleBetSuccess(candles) {
    this.profit += this.betOrders[this.patternPos].betAmount * 0.95;
    this.winCount++;
    this.patternPos = 0;
    this.isRunning = false; // cần hỏi lại chỗ này xem có set lại thành false hay không?
    this.calculateProfit += ` + ${Number((this.betOrders[this.patternPos].betAmount * 0.95).toFixed(2))}`;
    if (this.winCount % this.maxWinCount === 0) {
      this.updateMartingaleBetOrders(candles);
    }
  }

  updateMartingaleBetOrders(candles) {
    const length = this.condition.length + this.betOrders.length;
    const lastCandles = getLastCandles(candles, length);
    const newCondition = lastCandles.slice(0, this.condition.length).join('');
    const newBetOrders = lastCandles.slice(this.condition.length).map(
      (type, index) => ({
        ...this.betOrders[index],
        betType: index === 0 ? type === 'T' : type !== 'T'
      })
    );
    console.log('updateBetOrders');
    console.log({ oldCondition: this.condition, oldBetOrders: this.betOrders, newCondition, newBetOrders });
    this.condition = newCondition;
    this.betOrders = newBetOrders;
    this.betOrderUpdatedCount++;
    return this;
  }

  handleMartingaleBetFailed() {
    this.profit -= this.betOrders[this.patternPos].betAmount;
    this.calculateProfit += ` - ${Number((this.getPos().amount).toFixed(2))}`;
    if (this.betOrders.length - 1 === this.patternPos) {
      this.patternPos = 0;
      this.loseCount++;
    } else {
      this.patternPos++;
    }
  }

  toggleActive() {
    this.isActive = !this.isActive;
    this.isRunning = false;
    this.betRatioPos = 0;
    this.patternPos = 0;
    console.log({ isActive: this.isActive });
    return this;
  }
}

export default AwakenPattern;
