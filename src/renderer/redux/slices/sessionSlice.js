import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isBetSession: null,
    runningTimer: 0,
  },
  reducers: {
    toggleBetSession: (state, action) => {
      if (state.isBetSession !== action.payload) {
        state.isBetSession = action.payload;
      }
    },
    increaseRunningTimer: (state) => {
      state.runningTimer += 1;
    },
  },
});

export const { toggleBetSession, increaseRunningTimer } = sessionSlice.actions;

export const reloadPage = async () => {
  await axios(`http://localhost:${process.env.LOCAL_PORT}/dashboard/reload`);
};

export default sessionSlice.reducer;
