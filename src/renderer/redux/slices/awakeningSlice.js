import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import {
  readLocalAwakenPatterns,
  setLocalAwakenPatterns,
} from '../../../database/awakenPatterns';
import {
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

const initialState = {
  patternList: awakeningPatterns.list,
  maxId: awakeningPatterns.maxId,
  sumProfit: {
    paroli: 0,
    martingale: 0,
    total: 0,
  },
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
      const { type, isRunning, betOrders, patternPos, betRatio, betRatioPos } =
        pattern;
      const isMartingale = type === PATTERN_TYPE.MARTINGALE;

      if (isRunning) {
        if (betOrders[patternPos].betType) {
          upBetting.betAmount += isMartingale
            ? betOrders[patternPos].betAmount
            : betRatio[betRatioPos] * betOrders[patternPos].betAmount;
        } else {
          downBetting.betAmount += isMartingale
            ? betOrders[patternPos].betAmount
            : betRatio[betRatioPos] * betOrders[patternPos].betAmount;
        }
        pattern.betAmount += isMartingale
          ? betOrders[patternPos].betAmount
          : betRatio[betRatioPos] * betOrders[patternPos].betAmount;
      }
      pattern.betAmount = getNumberToFix(pattern.betAmount, 2);
    });
  }
  upBetting.betAmount = Number(upBetting.betAmount).toFixed(2);
  downBetting.betAmount = Number(downBetting.betAmount).toFixed(2);
  return [upBetting, downBetting];
};

export const startBet = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList },
  } = getState((state) => state);

  const newList = patternList.map((pattern) => startPattern(pattern, list));
  const betData = getBetData(newList, 'DEMO');
  const totalBetAmount = newList.reduce(
    (accum, pattern) => Number(accum) + Number(pattern.betAmount),
    0
  );
  dispatch(setPatternList(newList));
  dispatch(setTotalBetAmount(totalBetAmount));
  console.log(betData);
};

export const checkResult = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList },
  } = getState((state) => state);

  const newList = patternList.map((pattern) =>
    checkPatternResult(pattern, list)
  );
  const sumProfit = {
    paroli: 0,
    martingale: 0,
    total: 0,
  };

  newList.forEach((pattern) => {
    sumProfit.total += pattern.profit;
    if (pattern.type === PATTERN_TYPE.PAROLI) {
      sumProfit.paroli += pattern.profit;
    } else {
      sumProfit.martingale += pattern.profit;
    }
  });

  sumProfit.paroli = getNumberToFix(sumProfit.paroli, 2);
  sumProfit.martingale = getNumberToFix(sumProfit.martingale, 2);
  sumProfit.total = getNumberToFix(sumProfit.total, 2);

  dispatch(setPatternList(newList));
  dispatch(setSumProfit(sumProfit));
};

export const toggleActive = (id) => (dispatch, getState) => {
  const {
    awakening: { patternList },
  } = getState((state) => state);

  const newPatternList = patternList.map((pattern) => {
    return pattern.id === id ? togglePatternActive(pattern) : pattern;
  });
  dispatch(setPatternList(newPatternList));
};

export const resetAllPatterns = () => (dispatch, getState) => {
  const {
    awakening: { patternList = [] },
  } = getState((state) => state);
  const newPatternList = patternList.map((pattern) => resetPattern(pattern));
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

export const runAllPatterns =
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
