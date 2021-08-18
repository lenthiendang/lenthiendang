import { createSlice } from '@reduxjs/toolkit';

import Timestamp from '../../class/Timestamp';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isBetSession: null,
    counter: null,
  },
  reducers: {
    setCounter: (state, action) => {
      state.counter = action.payload;
    },

    toggleBetSession: (state, action) => {
      state.isBetSession = action.payload;
    },
  },
});

export const { setCounter, toggleBetSession } = sessionSlice.actions;

export const getTimestamp = () => (dispatch, getState) => {
  const {
    session: { isBetSession },
  } = getState((state) => state);

  const ts = new Timestamp();
  dispatch(setCounter(ts.counter));
  if (ts.isBetSession !== isBetSession) {
    dispatch(toggleBetSession(ts.isBetSession));
  }
};

export default sessionSlice.reducer;
