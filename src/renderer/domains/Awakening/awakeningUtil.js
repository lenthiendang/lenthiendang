import { descend, prop, sort } from 'ramda';
// eslint-disable-next-line import/no-cycle
import AwakenPattern from './models/AwakenPattern';

export const PATTERN_TYPE = {
  ALL: 'ALL',
  PAROLI: 'PAROLI',
  MARTINGALE: 'MARTINGALE',
  AUTO_PAROLI: 'AUTO_PAROLI',
  COMMON_PAROLI: 'COMMON_PAROLI',
  MINI_AWAKEN: 'MINI_AWAKEN', // is type work like Martingale
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
  MINI_LOSES: 'miniAwakenLoseList',
};

export const PATTERN_REALTIME_PROPS = [
  'commonParoliFailed',
  'miniAwakenWinCount',
  'miniAwakenLoseCount',
  'betRatio',
  'betRatioPos',
  'patternPos',
  'profit',
  'recentProfit',
  'recentBetAmount',
  'betAmount',
  'isRunning',
  'winCount',
  'realWinCount',
  'loseCount',
  'profitLoop',
  'virtualProfit',
  'isVirtualRun',
  'betOrderUpdatedCount',
];

export const PLAY_MODE = {
  PERSONAL: 'PERSONAL',
  COMMON: 'COMMON',
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

const paroliDefaultAmounts = [
  1, 1.95, 3.8, 7.41, 14.46, 28, 54.6, 106.4, 207, 403,
];

export const getDefaultParoliBetOrder = (betTypeString) => {
  if (!betTypeString) return [];
  return betTypeString.split('').map((type, index) => ({
    betType: type === 'T',
    betAmount: paroliDefaultAmounts[index],
  }));
};

export const getNumberToFix = (number, digits) =>
  Number(Number(number).toFixed(digits));

// exp valid values: 1 || 1-2-3-4
export const validateIntegerListString = (listString) => {
  return (listString && listString.startsWith('-')) || listString.endsWith('-')
    ? false
    : listString
        .split('-')
        .every((loopNumber) => Number.isInteger(Number(loopNumber)));
};

export const VALID_FUNDS = [10, 50, 100, 200];

export const INVALID_FUNDS = 0;

export const MINI_AWAKEN_ID_GROUP = {
  USD_10: {
    amount: 1,
    idList: [11, 12, 13],
  },
  USD_50: {
    amount: 2,
    idList: [11, 12, 13, 14, 15, 16],
  },
  USD_100: {
    amount: 1,
    idList: [19, 20, 21, 22, 23],
  },
  USD_200: {
    amount: 2,
    idList: [19, 20, 21, 22, 23, 24],
  },
};

const getValidFundsValue = (funds) => {
  if (!funds || funds <= 0 || funds < VALID_FUNDS[0]) return INVALID_FUNDS;
  for (let i = VALID_FUNDS.length - 1; i >= 0; i--) {
    if (funds >= VALID_FUNDS[i]) return VALID_FUNDS[i];
  }
  return INVALID_FUNDS;
};

export const getRandomMiniAwakenIds = (funds) => {
  const validFunds = getValidFundsValue(funds);
  if (validFunds === INVALID_FUNDS) return [];
  const idListResult = [];
  const randomMiniAwaken = MINI_AWAKEN_ID_GROUP[`USD_${validFunds}`];
  const { idList } = randomMiniAwaken;
  for (let i = 0; i < randomMiniAwaken.amount; i++) {
    let randomId = idList[Math.floor(Math.random() * idList.length)];
    while (idListResult.includes(randomId)) {
      randomId = idList[Math.floor(Math.random() * idList.length)];
    }
    idListResult.push(randomId);
  }
  // eslint-disable-next-line consistent-return
  return idListResult;
};

const allPossibleCombinations = (input = ['T', 'G'], length, curStr = '') => {
  if (curStr.length === length) return [curStr];
  const ret = [];
  for (let i = 0; i < input.length; i++) {
    // eslint-disable-next-line prefer-spread
    ret.push.apply(
      ret,
      allPossibleCombinations(input, length, curStr + input[i])
    );
  }
  return ret;
};

const AWAKEN_PAROLI_PATTERNS = {};

export const getAwakenParoliPattern = (length, index) => {
  const key = `LENGTH_${length}`;
  // eslint-disable-next-line no-prototype-builtins
  if (!AWAKEN_PAROLI_PATTERNS.hasOwnProperty(key)) {
    AWAKEN_PAROLI_PATTERNS[key] = allPossibleCombinations(
      ['T', 'G'],
      Number(length),
      ''
    );
  }
  return AWAKEN_PAROLI_PATTERNS[key][index];
};

export const mapToNewParoliPattern = (pattern) => {
  const condition = convertBetConditionInputToString(pattern.condition);
  const betLoop = pattern.betLoop.split('-').map((loop) => Number(loop));
  const betRatios = pattern.betRatios.split('-').map((ratio) => Number(ratio));
  const betOrders = pattern.betOrders
    .match(betOrderSingleRegExp)
    .map((betOder) => convertBetOrderStringToObject(betOder));

  return {
    condition,
    betOrders,
    betLoop,
    betRatios,
    type: pattern.type,
    patternPos: pattern.patternPos || 0,
    isActive: false,
  };
};

export const getCommonParoliPattern = ({ length, index, roomId }) => {
  const betOrders = getAwakenParoliPattern(length, index)
    .split('')
    .map((betType, idx) => `${betType}${paroliDefaultAmounts[idx]}`)
    .join('');
  const pattern = {
    betOrders,
    betLoop: '2',
    betRatios: '1',
    condition: '1T',
    miniAwakenLoseList: '',
    type: PATTERN_TYPE.COMMON_PAROLI,
    patternPos: -1,
  };
  const newPattern = mapToNewParoliPattern(pattern);
  newPattern.roomId = roomId;
  return new AwakenPattern(newPattern).getObject();
};
