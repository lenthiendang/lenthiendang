import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    isBetSession: null,
    runningTimer: 0,
  },
  reducers: {
    toggleBetSession: (state, action) => {
      state.isBetSession = action.payload;
    },
    increaseRunningTimer: (state) => {
      state.runningTimer += 1;
    },
  },
});

export const { toggleBetSession, increaseRunningTimer } = sessionSlice.actions;

// export const getTimestamp = () => (dispatch, getState) => {
//   const {
//     session: { isBetSession },
//   } = getState((state) => state);

//   const ts = new Timestamp();
//   dispatch(setCounter(ts.counter));
//   if (ts.isBetSession !== isBetSession) {
//     dispatch(toggleBetSession(ts.isBetSession));
//   }
// };

export default sessionSlice.reducer;
