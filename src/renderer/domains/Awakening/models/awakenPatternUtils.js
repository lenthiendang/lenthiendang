import { betConditionUnGroupRegExp, PATTERN_TYPE } from "../awakeningUtil";

const getLastCandles = (candles, length) =>
  candles.slice(length * -1).map((candle) => (candle.type ? "T" : "G"));

const getLastCandlesString = (candles, length) =>
  getLastCandles(candles, length).join("");

export const startPattern = (pattern, candles) => {
  let isRunning = false;
  if (
    pattern.isActive &&
    !pattern.isRunning &&
    pattern.condition ===
    getLastCandlesString(candles, pattern.condition.length)
  ) {
    // should bet here
    isRunning = true;
  }
  return { ...pattern, isRunning };
};

export const getParoliPos = (pattern) => {
  return {
    type: pattern.betOrders[pattern.patternPos].betType,
    amount:
      pattern.betRatio[pattern.betRatioPos] *
      pattern.betOrders[pattern.patternPos].betAmount
  };
};

export const getConditionGroupType = (pattern) => {
  return pattern.condition.match(betConditionUnGroupRegExp).reduce(
    (acc, current) => `${acc}${current.length}${current.charAt(0)}`,
    ""
  );
};

export const checkPatternResult = (pattern, candles) => {
  if (pattern.type === PATTERN_TYPE.PAROLI) {
    return checkParoliResult(pattern, candles);
  } else {
    return checkMartingaleResult(pattern, candles);
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

const handleParoliBetSuccess = (pattern) => {
  pattern.profit += getParoliPos(pattern).amount * 0.95;
  if (pattern.betOrders.length - 1 === pattern.patternPos) {
    console.log(
      `Win process paroli `,
      pattern.betOrders.map((b) => (b.type ? "T" : "G"))
    );
    pattern.winCount += 1;
    pattern.isActive = false;
    pattern.isRunning = false;
    pattern.patternPos = 0;
    pattern.betRatioPos = 0;
  } else {
    pattern.patternPos += 1;
  }
};

const handleDoneProcess = (pattern) => {
  console.log("Done process paroli because maximum of betLoop");
  pattern.isActive = false;
  pattern.isRunning = false;
  pattern.patternPos = 0;
  pattern.betRatioPos = 0;
};

const handleParoliBetFailed = (pattern) => {
  pattern.profit -= getParoliPos(pattern).amount;
  pattern.loseCount += 1;
  if (pattern.betRatioPos === pattern.betRatio.length - 1) {
    handleDoneProcess(pattern);
  } else {
    pattern.isRunning = false;
    pattern.patternPos = 0;
    pattern.betRatioPos += 1;
  }
};

const checkMartingaleResult = (pattern, candles) => {
  const lastCandle = candles[candles.length - 1];
  const newPattern = { ...pattern };
  if (newPattern.isRunning) {
    if (lastCandle.type ===
      newPattern.betOrders[newPattern.patternPos].betType) {
      handleMartingaleBetSuccess(newPattern, candles);
    } else {
      handleMartingaleBetFailed(newPattern);
    }
  }
  return newPattern;
};

const handleMartingaleBetSuccess = (pattern, candles) => {
  pattern.profit += pattern.betOrders[pattern.patternPos].betAmount * 0.95;
  pattern.winCount += 1;
  pattern.patternPos = 0;
  pattern.isRunning = false;
  if (pattern.winCount % pattern.maxWinCount === 0) {
    updateMartingaleBetOrders(pattern, candles);
  }
};

const updateMartingaleBetOrders = (pattern, candles) => {
  const length = pattern.condition.length + pattern.betOrders.length;
  const lastCandles = getLastCandles(candles, length);
  const newCondition = lastCandles.slice(0, pattern.condition.length).join("");
  const newBetOrders = lastCandles.slice(pattern.condition.length).
    map((type, index) => ({
      ...pattern.betOrders[index],
      betType: index === 0 ? type === "T" : type !== "T"
    }));
  console.log("updateBetOrders");
  console.log({
    oldCondition: pattern.condition,
    oldBetOrders: pattern.betOrders,
    newCondition,
    newBetOrders
  });
  pattern.condition = newCondition;
  pattern.betOrders = newBetOrders;
  pattern.betOrderUpdatedCount += 1;
};

const handleMartingaleBetFailed = (pattern) => {
  pattern.profit -= pattern.betOrders[pattern.patternPos].betAmount;
  if (pattern.betOrders.length - 1 === pattern.patternPos) {
    pattern.patternPos = 0;
    pattern.loseCount += 1;
  } else {
    pattern.patternPos += 1;
  }
};

export const togglePatternActive = (pattern) => {
  return {
    ...pattern,
    isActive: !pattern.isActive,
    isRunning: false,
    betRatioPos: 0,
    patternPos: 0
  };
};
