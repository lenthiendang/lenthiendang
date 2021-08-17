import { createSlice } from '@reduxjs/toolkit';
// import AwakeningInstance from '../../domains/Awakening/models/AwakeningInstance';

// const awakeningPatterns = AwakeningInstance.getInstance();

const initialState = {
  // patternList: awakeningPatterns.list,
  // maxId: awakeningPatterns.list
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
  },
});

// Selectors
export const selectPatternList = (state) => state.awakening.list;
// export const selectIncrementMaxId = (state) => state.awakening.maxId++;

// Actions
export const { setPatternList } = awakeningSlice.actions;

// Reducer
export default awakeningSlice.reducer;
