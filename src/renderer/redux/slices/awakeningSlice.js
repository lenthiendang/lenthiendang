import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import {
  readLocalAwakenPatterns,
  setLocalAwakenPatterns,
} from '../../../database/awakenPatterns';
import {
  getCandlesAppear,
  getDefaultParoliBetOrder,
  getNumberToFix,
  PATTERN_TYPE,
} from '../../domains/Awakening/awakeningUtil';
import AwakenPatternList from '../../domains/Awakening/models/AwakenPatternList';
import {
  checkPatternResult,
  getPatternUpdateBetOrders,
  resetPattern,
  startPattern,
  togglePatternActive,
} from '../../domains/Awakening/models/awakenPatternUtils';

const awakeningPatterns = new AwakenPatternList(readLocalAwakenPatterns());

const initSumProfit = {
  paroli: 0,
  autoParoli: 0,
  martingale: 0,
  total: 0,
};

const initialState = {
  patternList: awakeningPatterns.list,
  maxId: awakeningPatterns.maxId,
  sumProfit: initSumProfit,
  totalBetAmount: 0,
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
    setTotalBetAmount: (state, action) => {
      state.totalBetAmount = action.payload;
    },
  },
});

// Selectors
export const selectPatternList = (state) => state.awakening.patternList;
export const selectPattern = (id) => (state) =>
  state.awakening.patternList.find((pattern) => id === pattern.id);

// Actions
export const { setPatternList, setMaxId, setSumProfit, setTotalBetAmount } =
  awakeningSlice.actions;

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
        isRunning,
        isVirtualRun,
        betOrders,
        patternPos,
        betRatio,
        betRatioPos,
      } = pattern;
      const isMartingale = type === PATTERN_TYPE.MARTINGALE;

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

export const startBet = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList, totalBetAmount },
  } = getState((state) => state);

  let newTotalBetAmount = totalBetAmount;
  const newList = patternList.map((pattern) => startPattern(pattern, list));
  const betData = getBetData(newList, 'DEMO');
  newList.forEach((pattern) => {
    newTotalBetAmount += pattern.isRunning ? pattern.recentBetAmount : 0;
    pattern.recentBetAmount = 0;
  });
  dispatch(setPatternList(newList));
  dispatch(setTotalBetAmount(newTotalBetAmount));
  console.log(betData);
};

export const checkResult = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList, sumProfit },
  } = getState((state) => state);

  const newList = patternList.map((pattern) =>
    checkPatternResult(pattern, list)
  );
  const sumProfitNow = { ...sumProfit };

  newList.forEach((pattern) => {
    sumProfitNow.total += pattern.recentProfit;
    switch (pattern.type) {
      case PATTERN_TYPE.AUTO_PAROLI:
        sumProfitNow.autoParoli += pattern.recentProfit;
        break;
      case PATTERN_TYPE.MARTINGALE:
        sumProfitNow.martingale += pattern.recentProfit;
        break;
      default:
        sumProfitNow.paroli += pattern.recentProfit;
    }
    // after set to sumProfit state, reset to 0
    pattern.recentProfit = 0;
  });

  sumProfitNow.paroli = getNumberToFix(sumProfitNow.paroli, 2);
  sumProfitNow.autoParoli = getNumberToFix(sumProfitNow.autoParoli, 2);
  sumProfitNow.martingale = getNumberToFix(sumProfitNow.martingale, 2);
  sumProfitNow.total = getNumberToFix(sumProfitNow.total, 2);

  dispatch(setPatternList(newList));
  dispatch(setSumProfit(sumProfitNow));
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

export const updateAllMartingaleBetOrders = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList },
  } = getState((state) => state);
  const newList = patternList.map((pattern) => {
    return pattern.type === PATTERN_TYPE.PAROLI
      ? pattern
      : getPatternUpdateBetOrders({ ...pattern }, list);
  });
  dispatch(setPatternList(newList));
};

const getParoliOftenAppear = (candleList) =>
  candleList.map((candleString, index) => ({
    id: index + 1,
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
      case PATTERN_TYPE.MARTINGALE:
        return getPatternUpdateBetOrders({ ...pattern }, list);
      default:
        return pattern;
    }
  });
  dispatch(setPatternList(newList));
};

export const updateAutoParoliPatternList = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList },
  } = getState((state) => state);
  const candleList = getCandlesAppear(list, 7, false).max;
  const newGoodParoli = getParoliOftenAppear(candleList);

  const newList = patternList.map((pattern) => {
    if (pattern.type === PATTERN_TYPE.AUTO_PAROLI) {
      return { ...pattern, ...newGoodParoli[pattern.id - 1] };
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

// Reducer
export default awakeningSlice.reducer;
