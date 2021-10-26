import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isBetSession: null,
    runningTimer: 0,
  },
  reducers: {
    setBetSession: (state, action) => {
      state.isBetSession = action.payload;
    },
    increaseRunningTimer: (state) => {
      state.runningTimer += 1;
    },
  },
});

export const { setBetSession, increaseRunningTimer } = sessionSlice.actions;

export const toggleBetSession = (payload) => (dispatch, getState) => {
  const {
    session: { isBetSession },
  } = getState((store) => store);

  if (isBetSession !== payload) {
    setBetSession(payload);
  }
};

export const reloadPage = () => async (dispatch, getState) => {
  const {
    auth: { isOpenBrowser },
  } = getState((store) => store);

  if (isOpenBrowser) {
    await axios(`http://localhost:${process.env.LOCAL_PORT}/dashboard/reload`);
  }
};

export default sessionSlice.reducer;
