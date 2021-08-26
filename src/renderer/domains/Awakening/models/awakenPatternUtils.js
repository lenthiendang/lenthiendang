import {
  betConditionUnGroupRegExp,
  PATTERN_REALTIME_PROPS,
  PATTERN_TYPE,
} from '../awakeningUtil';

const getLastCandles = (candles, length) =>
  candles.slice(length * -1).map((candle) => (candle.type ? 'T' : 'G'));

const getLastCandlesString = (candles, length) =>
  getLastCandles(candles, length).join('');

export const startPattern = (pattern, candles) => {
  let { isRunning } = pattern;
  if (
    pattern.isActive &&
    !pattern.isRunning &&
    pattern.condition ===
      getLastCandlesString(candles, pattern.condition.length)
  ) {
    isRunning = true;
  }
  return { ...pattern, isRunning };
};

export const getParoliPos = (pattern) => {
  return {
    type: pattern.betOrders[pattern.patternPos].betType,
    amount:
      pattern.betRatio[pattern.betRatioPos] *
      pattern.betOrders[pattern.patternPos].betAmount,
  };
};

const handleParoliBetSuccess = (pattern) => {
  pattern.profit += getParoliPos(pattern).amount * 0.95;
  if (pattern.betOrders.length - 1 === pattern.patternPos) {
    console.log(
      `Win process paroli `,
      pattern.betOrders.map((b) => (b.betType ? 'T' : 'G'))
    );
    pattern.winCount += 1;
    pattern.isRunning = false;
    pattern.patternPos = 0;
    pattern.betRatioPos = 0;
  } else {
    pattern.patternPos += 1;
  }
};

const restartParoliProcess = (pattern) => {
  pattern.isRunning = false;
  pattern.patternPos = 0;
  pattern.betRatioPos = 0;
};

const handleParoliBetFailed = (pattern) => {
  pattern.profit -= getParoliPos(pattern).amount;
  pattern.loseCount += 1;
  if (pattern.betRatioPos === pattern.betRatio.length - 1) {
    restartParoliProcess(pattern);
  } else {
    pattern.isRunning = false;
    pattern.patternPos = 0;
    pattern.betRatioPos += 1;
  }
};

const checkParoliResult = (pattern, candles) => {
  const lastCandle = candles[candles.length - 1];
  const newPattern = { ...pattern };
  if (pattern.isRunning) {
    if (lastCandle.type === getParoliPos(pattern).type) {
      handleParoliBetSuccess(newPattern);
    } else {
      handleParoliBetFailed(newPattern);
    }
  }
  return newPattern;
};

const getConditionGroupType = (pattern) => {
  return pattern.condition
    .match(betConditionUnGroupRegExp)
    .reduce(
      (acc, current) => `${acc}${current.length}${current.charAt(0)}`,
      ''
    );
};

const updateMartingaleBetOrders = (pattern, candles) => {
  const length = pattern.condition.length + pattern.betOrders.length;
  const lastCandles = getLastCandles(candles, length);
  const newCondition = lastCandles.slice(0, pattern.condition.length).join('');
  const newBetOrders = lastCandles
    .slice(pattern.condition.length)
    .map((type, index) => ({
      ...pattern.betOrders[index],
      betType: index === 0 ? type === 'T' : type !== 'T',
    }));
  pattern.condition = newCondition;
  pattern.conditionGroupType = getConditionGroupType(pattern);
  pattern.betOrders = newBetOrders;
  pattern.betOrderUpdatedCount += 1;
};

export const getPatternUpdateBetOrders = (pattern, candles) => {
  updateMartingaleBetOrders(pattern, candles);
  return pattern;
};

const handleMartingaleBetFailed = (pattern) => {
  const profit = pattern.isVirtualRun
    ? 0
    : pattern.betOrders[pattern.patternPos].betAmount;
  pattern.profit -= profit;
  pattern.profitLoop -= profit;

  // if lose a martingale pattern
  if (pattern.betOrders.length - 1 === pattern.patternPos) {
    pattern.patternPos = 0;
    pattern.loseCount += 1;
    if (pattern.isVirtualRun) {
      pattern.profitLoop = 0;
    }
    if (pattern.martingaleWinLoopPos === pattern.martingaleWinLoop.length - 1) {
      pattern.martingaleWinLoopPos = 0;
    } else {
      pattern.martingaleWinLoopPos += pattern.isVirtualRun ? 1 : 0;
    }
    pattern.isVirtualRun = false;
  } else {
    pattern.patternPos += 1;
  }
};

const handleMartingaleBetSuccess = (pattern, candles) => {
  const profit = pattern.isVirtualRun
    ? 0
    : pattern.betOrders[pattern.patternPos].betAmount * 0.95;
  pattern.profit += profit;
  pattern.profitLoop += profit;
  pattern.winCount += 1;
  pattern.patternPos = 0;
  pattern.isRunning = false;
  // if profit >= limit win amount => run virtual
  pattern.isVirtualRun =
    pattern.profitLoop >=
    pattern.martingaleWinLoop[pattern.martingaleWinLoopPos];

  if (pattern.winCount % pattern.maxWinCount === 0) {
    updateMartingaleBetOrders(pattern, candles);
  }
};

const checkMartingaleResult = (pattern, candles) => {
  const lastCandle = candles[candles.length - 1];
  const newPattern = { ...pattern };
  if (newPattern.isRunning) {
    if (
      lastCandle.type === newPattern.betOrders[newPattern.patternPos].betType
    ) {
      handleMartingaleBetSuccess(newPattern, candles);
    } else {
      handleMartingaleBetFailed(newPattern);
    }
  }
  return newPattern;
};

export const checkPatternResult = (pattern, candles) => {
  if (pattern.type === PATTERN_TYPE.PAROLI) {
    return checkParoliResult(pattern, candles);
  }
  return checkMartingaleResult(pattern, candles);
};

export const togglePatternActive = (pattern) => {
  return {
    ...pattern,
    isActive: !pattern.isActive,
    isRunning: false,
    betRatioPos: 0,
    patternPos: 0,
  };
};

export const resetPattern = (pattern, isDeleteRealTimeProps = false) => {
  const newPattern = {
    ...pattern,
    isActive: false,
    isRunning: false,
    isVirtualRun: false,
    betRatioPos: 0,
    martingaleWinLoopPos: 0,
    patternPos: 0,
    profit: 0,
    profitLoop: 0,
    betAmount: 0,
    winCount: 0,
    loseCount: 0,
    betOrderUpdatedCount: 0,
  };
  if (isDeleteRealTimeProps) {
    PATTERN_REALTIME_PROPS.forEach((prop) => {
      delete newPattern[prop];
    });
  }
  return newPattern;
};
