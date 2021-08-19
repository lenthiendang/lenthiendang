import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { PATTERN_TYPE } from '../../domains/Awakening/awakeningUtil';
import AwakeningInstance from '../../domains/Awakening/models/AwakeningInstance';
import {
  checkPatternResult,
  startPattern,
  togglePatternActive,
} from '../../domains/Awakening/models/awakenPatternUtils';

const awakeningPatterns = AwakeningInstance.getInstance();

const initialState = {
  patternList: awakeningPatterns.list,
  maxId: awakeningPatterns.maxId,
  sumProfit: 0,
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
  },
});

// Selectors
export const selectPatternList = (state) => state.awakening.patternList;
export const selectPattern = (id) => (state) =>
  state.awakening.patternList.find((pattern) => id === pattern.id);

// Actions
export const { setPatternList, setMaxId, setSumProfit } =
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
      }
    });
  }

  return [upBetting, downBetting];
};

export const start = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList },
  } = getState((state) => state);

  const newList = patternList.map((pattern) => startPattern(pattern, list));
  const betData = getBetData(newList, 'DEMO');
  dispatch(setPatternList(newList));
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
  const sumProfit = Math.round(
    newList.map((pattern) => pattern.profit).reduce((s, v) => s + v)
  );
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

export const sumProfit = () => (dispatch, getState) => {
  const {
    awakening: { patternList },
  } = getState((state) => state);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const sumProfit = Math.round(
    patternList.map((pattern) => pattern.profit).reduce((s, v) => s + v)
  );
  dispatch(setSumProfit(sumProfit));
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
};

export const deletePattern = (id) => (dispatch, getState) => {
  const {
    awakening: { patternList },
  } = getState((state) => state);
  const newList = patternList.filter((pattern) => pattern.id !== id);
  dispatch(setPatternList(newList));
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
};

// Reducer
export default awakeningSlice.reducer;
