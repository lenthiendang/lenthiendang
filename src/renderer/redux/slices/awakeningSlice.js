import { createSlice } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';
import { batch } from 'react-redux';
import {
  readLocalAwakenPatterns,
  setLocalAwakenPatterns,
} from '../../../database/awakenPatterns';
import {
  getCandlesAppear,
  getDefaultParoliBetOrder,
  getNumberToFix,
  getRandomMiniAwakenIds,
  PATTERN_TYPE,
} from '../../domains/Awakening/awakeningUtil';
import AwakenPatternList from '../../domains/Awakening/models/AwakenPatternList';
import {
  activePattern,
  checkPatternResult,
  getPatternUpdateBetOrders,
  resetAutoParoliPattern,
  resetPattern,
  startPattern,
  togglePatternActive,
} from '../../domains/Awakening/models/awakenPatternUtils';
import API from '../../class/API';
import { sleep } from '../../../utils';
import { getBalance } from './accountSlice';
import { reloadPage } from './sessionSlice';

const awakeningPatterns = new AwakenPatternList(readLocalAwakenPatterns());

const initSumProfit = {
  paroli: 0,
  autoParoli: 0,
  miniAwaken: 0,
  martingale: 0,
  total: 0,
};

const initBetAmount = {
  up: 0,
  down: 0,
};

const initialState = {
  patternList: awakeningPatterns.list,
  maxId: awakeningPatterns.maxId,
  sumProfit: initSumProfit,
  betAmount: initBetAmount,
  totalBetAmount: 0,
  stopLossPoint: 0,
  takeProfitPoint: 0,
  profitResult: 0,
};

const awakeningSlice = createSlice({
  name: 'awakening',
  initialState,
  reducers: {
    setPatternList: (state, action) => {
      state.patternList = action.payload;
    },
    setMaxId: (state, action) => {
      state.maxId = action.payload;
    },
    setSumProfit: (state, action) => {
      state.sumProfit = action.payload;
    },
    setProfitResult: (state, action) => {
      state.profitResult = action.payload;
    },
    setBetAmount: (state, action) => {
      state.betAmount = action.payload;
    },
    setStopLossPoint: (state, action) => {
      state.stopLossPoint = action.payload;
    },
    setTakeProfitPoint: (state, action) => {
      state.takeProfitPoint = action.payload;
    },
    setTotalBetAmount: (state, action) => {
      state.totalBetAmount = action.payload;
    },
  },
});

// Selectors
export const selectRunning = (state) =>
  state.awakening.patternList.some((pattern) => pattern.isActive === true);

// Actions
export const {
  setPatternList,
  setMaxId,
  setSumProfit,
  setProfitResult,
  setBetAmount,
  setTotalBetAmount,
  setStopLossPoint,
  setTakeProfitPoint,
} = awakeningSlice.actions;

const getBetData = (patternList, betAccountType) => {
  const [upBetting, downBetting] = [
    {
      betType: 'UP',
      betAmount: 0,
      betAccountType,
    },
    {
      betType: 'DOWN',
      betAmount: 0,
      betAccountType,
    },
  ];

  if (patternList && patternList.length > 0) {
    patternList.forEach((pattern) => {
      const {
        type,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        isRunning,
        isVirtualRun,
        betOrders,
        patternPos,
        betRatio,
        betRatioPos,
      } = pattern;
      // MiniAwaken is a Martingale other type
      const isMartingale = type === PATTERN_TYPE.MINI_AWAKEN;

      if (isRunning) {
        // eslint-disable-next-line no-nested-ternary
        const currentBetAmount = isMartingale
          ? isVirtualRun
            ? 0
            : betOrders[patternPos].betAmount
          : betRatio[betRatioPos] * betOrders[patternPos].betAmount;

        if (betOrders[patternPos].betType) {
          upBetting.betAmount += currentBetAmount;
        } else {
          downBetting.betAmount += currentBetAmount;
        }
        pattern.betAmount += currentBetAmount;
        pattern.recentBetAmount = currentBetAmount;
      }
      pattern.betAmount = getNumberToFix(pattern.betAmount, 2);
      pattern.recentBetAmount = getNumberToFix(pattern.recentBetAmount, 2);
    });
  }
  upBetting.betAmount = Number(upBetting.betAmount).toFixed(2);
  downBetting.betAmount = Number(downBetting.betAmount).toFixed(2);
  return [upBetting, downBetting];
};

export const startBet = () => async (dispatch, getState) => {
  const {
    auth: { accessToken },
    account: { accountType, balance },
    price: { list },
    awakening: { patternList, totalBetAmount },
  } = getState((state) => state);

  let newTotalBetAmount = totalBetAmount;
  const newList = patternList.map((pattern) => startPattern(pattern, list));
  const betData = getBetData(newList, accountType);
  if (
    Number(balance) <
    Number(betData[0].betAmount) + Number(betData[1].betAmount)
  ) {
    // eslint-disable-next-line no-alert
    alert('Số dư không đủ để tiếp tục');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(resetAllPatterns());
    return;
  }
  newList.forEach((pattern) => {
    newTotalBetAmount += pattern.isRunning ? pattern.recentBetAmount : 0;
    pattern.recentBetAmount = 0;
  });
  dispatch(setPatternList(newList));
  dispatch(
    setBetAmount({
      up: Number(betData[0].betAmount),
      down: Number(betData[1].betAmount),
    })
  );
  dispatch(setTotalBetAmount(newTotalBetAmount));

  // send betData to exchange

  const api = new API({ accessToken });

  for (let i = 0; i < betData.length; i++) {
    if (betData[i].betAmount * 1 !== 0) {
      await api.fetchFromExchangeServer('bet', betData[i]);
      await sleep(500);
    }
  }
  dispatch(getBalance());
  await reloadPage();
};

function calculateSumProfit(sumProfit, pattern) {
  switch (pattern.type) {
    case PATTERN_TYPE.MINI_AWAKEN:
      sumProfit.miniAwaken += pattern.recentProfit;
      break;
    case PATTERN_TYPE.AUTO_PAROLI:
      sumProfit.autoParoli += pattern.recentProfit;
      break;
    default:
      sumProfit.paroli += pattern.recentProfit;
  }
}

function toFixNumberSumProfit(sumProfit) {
  sumProfit.paroli = getNumberToFix(sumProfit.paroli, 2);
  sumProfit.autoParoli = getNumberToFix(sumProfit.autoParoli, 2);
  sumProfit.martingale = getNumberToFix(sumProfit.martingale, 2);
  sumProfit.miniAwaken = getNumberToFix(sumProfit.miniAwaken, 2);
  sumProfit.total = getNumberToFix(sumProfit.total, 2);
}

export const checkResult = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList, sumProfit, stopLossPoint, takeProfitPoint },
  } = getState((state) => state);
  let isRunning = false;

  const sumProfitNow = { ...sumProfit };

  const newList = patternList.map((pattern) => {
    if (!isRunning && pattern.isActive) {
      isRunning = true;
    }
    const newPattern = checkPatternResult(pattern, list);
    sumProfitNow.total += newPattern.recentProfit;
    if (newPattern.recentProfit !== 0) {
      calculateSumProfit(sumProfitNow, newPattern);
      // after set to sumProfit state, reset to 0
      newPattern.recentProfit = 0;
    }

    return newPattern;
  });

  toFixNumberSumProfit(sumProfitNow);

  batch(() => {
    dispatch(setPatternList(newList));
    dispatch(setSumProfit(sumProfitNow));
  });

  if (isRunning) {
    dispatch(setProfitResult(Number(sumProfitNow.total)));
    if (
      (takeProfitPoint !== 0 && sumProfitNow.total >= takeProfitPoint) ||
      (stopLossPoint !== 0 && sumProfitNow.total <= stopLossPoint)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(resetAllPatterns());
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(updateAutoParoliPatternList());
      dispatch(startBet());
    }
  }
};

export const toggleActive =
  ({ id, type }) =>
  (dispatch, getState) => {
    const {
      awakening: { patternList },
    } = getState((state) => state);

    const newPatternList = patternList.map((pattern) => {
      return type === pattern.type || pattern.id === id
        ? togglePatternActive(pattern)
        : pattern;
    });
    dispatch(setPatternList(newPatternList));
  };

export const resetAllPatterns = () => (dispatch, getState) => {
  const {
    awakening: { patternList = [] },
  } = getState((state) => state);
  const newPatternList = patternList.map((pattern) => resetPattern(pattern));
  dispatch(setPatternList(newPatternList));
  dispatch(setSumProfit(initSumProfit));
  dispatch(setBetAmount(initBetAmount));
};

export const stopPatterns = (type) => (dispatch, getState) => {
  if (!type) return;
  const {
    awakening: { patternList = [] },
  } = getState((state) => state);
  const newPatternList = patternList.map((pattern) =>
    type === pattern.type ? resetPattern(pattern) : pattern
  );
  dispatch(setPatternList(newPatternList));
};

const saveLocalPatterns = (patternList) => {
  const saveNewList = setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const cloneList = patternList.map((pattern) => resetPattern(pattern, true));
    setLocalAwakenPatterns(cloneList);
    clearTimeout(saveNewList);
  }, 0);
};

export const addPattern = (pattern) => (dispatch, getState) => {
  const {
    awakening: { patternList, maxId },
  } = getState((state) => state);

  const newList = patternList.slice(0);
  newList.push({ ...pattern, id: maxId + 1 });
  batch(() => {
    dispatch(setMaxId(maxId + 1));
    dispatch(setPatternList(newList));
  });
  saveLocalPatterns(newList);
};

export const deletePattern = (id) => (dispatch, getState) => {
  const {
    awakening: { patternList },
  } = getState((state) => state);
  const newList = patternList.filter((pattern) => pattern.id !== id);
  dispatch(setPatternList(newList));
  saveLocalPatterns(newList);
};

export const updatePattern = (updatedPattern) => (dispatch, getState) => {
  const {
    awakening: { patternList },
  } = getState((state) => state);
  const newList = patternList.slice(0);
  const index = newList.findIndex(
    (pattern) => updatedPattern.id === pattern.id
  );
  newList.splice(index, 1, updatedPattern);
  dispatch(setPatternList(newList));
  saveLocalPatterns(newList);
};

const getParoliOftenAppear = (candleList) =>
  candleList.map((candleString) => ({
    condition: candleString.type.charAt(0),
    betOrders: getDefaultParoliBetOrder(candleString.type.slice(1)),
  }));

export const updatePatternList = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList },
  } = getState((state) => state);
  const candleList = getCandlesAppear(list, 7, false).max;
  const newGoodParoli = getParoliOftenAppear(candleList);

  const newList = patternList.map((pattern) => {
    switch (pattern.type) {
      case PATTERN_TYPE.AUTO_PAROLI:
        return { ...pattern, ...newGoodParoli[pattern.id - 1] };
      case PATTERN_TYPE.MINI_AWAKEN:
        return getPatternUpdateBetOrders({ ...pattern }, list);
      default:
        return pattern;
    }
  });
  dispatch(setPatternList(newList));
};

const getParoliPatternString = (patternList) =>
  patternList
    .filter((pattern) => pattern.type === PATTERN_TYPE.AUTO_PAROLI)
    .map(
      (p) =>
        `${p.condition}${p.betOrders
          .map((bet) => (bet.betType ? 'T' : 'G'))
          .join('')}`
    );

export const updateAutoParoliPatternList = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList },
  } = getState((state) => state);
  const candleList = getCandlesAppear(list, 7, false).max;
  const candlePatterns = candleList.map((candle) => candle.type);
  const currentAutoPatterns = getParoliPatternString(patternList);
  const isEqualPatterns = isEqual(candlePatterns, currentAutoPatterns);
  if (isEqualPatterns) {
    return;
  }

  const newGoodParoli = getParoliOftenAppear(candleList);
  const newList = patternList.map((pattern) => {
    if (pattern.type === PATTERN_TYPE.AUTO_PAROLI) {
      return {
        ...resetAutoParoliPattern(pattern),
        ...newGoodParoli[pattern.id - 1],
      };
    }
    return pattern;
  });
  dispatch(setPatternList(newList));
};

export const runPatterns =
  (type = PATTERN_TYPE.PAROLI) =>
  (dispatch, getState) => {
    const {
      awakening: { patternList },
    } = getState((state) => state);

    const newPatternList = patternList.map((pattern) => ({
      ...pattern,
      isActive: type === pattern.type || pattern.isActive,
    }));
    dispatch(setPatternList(newPatternList));
  };

export const runRandomPatterns = (funds) => (dispatch, getState) => {
  const {
    awakening: { patternList },
    account: { balance },
  } = getState((state) => state);
  const fundsValue = funds ? Number(funds) : Number(balance);
  const runningPatternIds = getRandomMiniAwakenIds(fundsValue);
  const newPatternList = patternList.map((pattern) => {
    return runningPatternIds.includes(pattern.id)
      ? activePattern(pattern, true)
      : pattern;
  });
  dispatch(setPatternList(newPatternList));
};

// Reducer
export default awakeningSlice.reducer;
