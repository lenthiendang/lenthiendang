import { descend, prop, sort } from 'ramda';

export const PATTERN_TYPE = {
  ALL: 'ALL',
  PAROLI: 'PAROLI',
  MARTINGALE: 'MARTINGALE',
  AUTO_PAROLI: 'AUTO_PAROLI',
  MINI_AWAKEN: 'MINI_AWAKEN',
};

export const PATTERN_FIELD = {
  ID: 'id',
  TYPE: 'type',
  CONDITION: 'condition',
  BET_ORDERS: 'betOrders',
  BET_LOOP: 'betLoop',
  BET_RATIOS: 'betRatios',
  MAX_WIN_COUNT: 'maxWinCount',
  WIN_LOOP: 'martingaleWinLoop',
  BET_AMOUNTS: 'betAmounts',
};

export const PATTERN_REALTIME_PROPS = [
  'betRatio',
  'betRatioPos',
  'patternPos',
  'profit',
  'betAmount',
  'isRunning',
  'winCount',
  'loseCount',
  'profitLoop',
  'isVirtualRun',
  'betOrderUpdatedCount',
];

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

const convertCandleListToString = (candles) => {
  return candles.map((candle) => (candle.type ? 'T' : 'G')).join('');
};

const initPattern = (length) => {
  let numberOfPattern = 1;
  const done = {};
  for (let i = 0; i < length; i++) {
    numberOfPattern *= 2;
  }
  for (let i = 0; i < numberOfPattern; i++) {
    const candle = i
      .toString(2)
      .split('')
      .map((cd) => (cd === '0' ? 'G' : 'T'));
    while (candle.length < length) {
      candle.unshift('G');
    }
    done[candle.join('')] = 0;
  }
  return done;
};

const byCount = descend(prop('count'));

export const getCandlesAppear = (list, length, isDuplicated) => {
  const stringList = convertCandleListToString(list);
  const done = initPattern(length);
  let lastCandle = null;
  let lastSession = null;
  for (let i = 0; i <= stringList.length - length; i++) {
    if (!done[stringList.slice(i, i + length)]) {
      done[stringList.slice(i, i + length)] = 1;
    } else {
      const key = stringList.slice(i, i + length);
      if (!isDuplicated) {
        if (
          lastCandle !== key ||
          (lastCandle === key && i - lastSession === length)
        ) {
          done[key] += 1;
          lastCandle = key;
          lastSession = i;
        } else {
          // console.log(i - lastSession === length);
        }
      } else {
        done[key] += 1;
      }
    }
  }

  const sortedCandleByCount = sort(
    byCount,
    Object.entries(done).map(([key, val]) => ({ type: key, count: val }))
  );
  return {
    max: sortedCandleByCount.slice(0, 10),
    min: sortedCandleByCount.slice(-10).reverse(),
  };
};

const paroliDefaultAmounts = [1, 1.95, 3.8, 7.4, 14.4, 28, 54, 107];

export const getDefaultParoliBetOrder = (betTypeString) => {
  if (!betTypeString) return [];
  return betTypeString.split('').map((type, index) => ({
    betType: type === 'T',
    betAmount: paroliDefaultAmounts[index],
  }));
};

export const getNumberToFix = (number, digits) =>
  Number(Number(number).toFixed(digits));
