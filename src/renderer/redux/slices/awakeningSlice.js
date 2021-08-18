import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import AwakeningInstance
  from "../../domains/Awakening/models/AwakeningInstance";
import {
  checkPatternResult,
  startPattern, togglePatternActive
} from "../../domains/Awakening/models/awakenPatternUtils";

const awakeningPatterns = AwakeningInstance.getInstance();

const initialState = {
  patternList: awakeningPatterns.list,
  maxId: awakeningPatterns.maxId,
  sumProfit: 0
};

const awakeningSlice = createSlice({
  name: "awakening",
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
    }
  }
});

// Selectors
export const selectPatternList = (state) => state.awakening.patternList;
export const selectPattern = (id) => (state) => state.awakening.patternList.find(
  (pattern) => id === pattern.id);

// Actions
export const {
  setPatternList,
  setMaxId,
  setSumProfit
} = awakeningSlice.actions;

export const start = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList }
  } = getState((state) => state);

  const newList = patternList.map((pattern) => startPattern(pattern, list));
  dispatch(setPatternList(newList));
};

export const checkResult = () => (dispatch, getState) => {
  const {
    price: { list },
    awakening: { patternList }
  } = getState((state) => state);

  const newList = patternList.map(
    (pattern) => checkPatternResult(pattern, list));
  dispatch(setPatternList(newList));
};

export const toggleActive = (id) => (dispatch, getState) => {
  const {
    awakening: { patternList }
  } = getState((state) => state);

  const newPatternList = patternList.map((pattern) => {
    return pattern.id === id ? togglePatternActive(pattern) : pattern;
  });
  dispatch(setPatternList(newPatternList));
};

export const sumProfit = () => (dispatch, getState) => {
  const {
    awakening: { patternList }
  } = getState((state) => state);

  const sumProfit = Math.round(
    patternList.map((pattern) => pattern.profit).
      reduce((s, v) => s + v)
  );
  dispatch(setSumProfit(sumProfit));
};

export const addPattern = (pattern) => (dispatch, getState) => {
  const {
    awakening: { patternList, maxId }
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
    awakening: { patternList }
  } = getState((state) => state);
  const newList = patternList.filter(pattern => pattern.id !== id);
  dispatch(setPatternList(newList));
};

export const updatePattern = (updatedPattern) => (dispatch, getState) => {
  const {
    awakening: { patternList }
  } = getState((state) => state);
  const newList = patternList.slice(0);
  const index = newList.findIndex(
    (pattern) => updatedPattern.id === pattern.id);
  newList.splice(index, 1, updatedPattern);
  dispatch(setPatternList(newList));
};

// Reducer
export default awakeningSlice.reducer;
