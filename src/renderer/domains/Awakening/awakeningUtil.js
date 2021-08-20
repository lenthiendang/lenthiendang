export const PATTERN_TYPE = {
  PAROLI: 'PAROLI',
  MARTINGALE: 'MARTINGALE',
};

export const PATTERN_FIELD = {
  ID: 'id',
  TYPE: 'type',
  CONDITION: 'condition',
  BET_ORDERS: 'betOrders',
  BET_LOOP: 'betLoop',
  BET_RATIOS: 'betRatios',
  MAX_WIN_COUNT: 'maxWinCount',
  BET_AMOUNTS: 'betAmounts',
};

export const betOrderRegExp = /^([TG]\d+\.?\d*)+$/;

export const betOrderSingleRegExp = /[TG]\d+\.?\d*/g;

export const betConditionRegExp = /^([1-9]\d?[TG])+$/;

export const betConditionSingleRegExp = /[1-9]\d?[TG]/g;

export const betConditionUnGroupRegExp = /(T+|G+)/g;

export const convertBetOrderStringToObject = (betOder) => {
  if (!betOder.startsWith('T') && !betOder.startsWith('G')) {
    return null;
  }
  return {
    betType: betOder.charAt(0) === 'T',
    betAmount: Number(betOder.slice(1)),
  };
};

export const convertBetConditionStringToObject = (condition) => {
  if (!condition.endsWith('T') && !condition.endsWith('G')) {
    return null;
  }
  const count = Number(condition.slice(0, condition.length - 1));
  if (!Number.isInteger(count)) {
    return null;
  }
  return {
    type: condition.charAt(condition.length - 1) === 'T',
    count,
  };
};

export const convertToBetConditionList = (condition) => {
  const isValid = betConditionRegExp.test(condition);
  if (!isValid) return;

  // eslint-disable-next-line consistent-return
  return condition
    .match(betConditionSingleRegExp)
    .map((cond) => convertBetConditionStringToObject(cond));
};

export const convertBetConditionInputToString = (condition) => {
  const isValid = betConditionRegExp.test(condition);
  if (!isValid) return;

  const subConditions = condition
    .match(betConditionSingleRegExp)
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .map((condition) => convertBetConditionStringToObject(condition));

  let conditionString = '';
  subConditions.forEach((candle) => {
    conditionString += new Array(candle.count)
      .fill(candle.type ? 'T' : 'G')
      .join('');
  });

  // eslint-disable-next-line consistent-return
  return conditionString;
};

export const convertBetConditionToString = (conditionList) => {
  let conditionString = '';
  conditionList.forEach((candle) => {
    conditionString += new Array(candle.count)
      .fill(candle.type ? 'T' : 'G')
      .join('');
  });

  return conditionString;
};

export const getNumberToFix = (number, digits) =>
  Number(Number(number).toFixed(digits));
