import { createSlice } from '@reduxjs/toolkit';
import User from '../../class/User';

const initialState = {
  originalBalance: undefined,
  balance: undefined,
  profit: undefined,
  isAuto: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    ...initialState,
    accountType: 'DEMO',
    expiredOn: undefined,
    candleCount: undefined,
    fn: undefined,
    role: undefined,
    email: undefined,
    name: undefined,
    sponsor: undefined,
    photo: undefined,
    stopLossPoint: 0,
    takeProfitPoint: 0,
    totalBet: 0,
    enabled2fa: false,
  },
  reducers: {
    setInfo: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.sponsor = action.payload.sponsor;
      state.photo = action.payload.photo;
      state.enabled2fa = action.payload.enabled2fa;
    },
    setAccountType: (state, action) => {
      state.accountType = action.payload;
    },
    setExpiredOn: (state, action) => {
      state.expiredOn = action.payload;
    },
    setPrivilege: (state, action) => {
      state.fn = action.payload.fn;
      state.role = action.payload.role;
      state.expiredOn = action.payload.expiredOn;
      state.candleCount = action.payload.candle;
    },
    setOriginalBalance: (state, action) => {
      state.originalBalance = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
      state.profit = state.balance - state.originalBalance;
    },
    setTotalBet: (state, action) => {
      state.totalBet = action.payload;
    },
    addTotalBet: (state, action) => {
      state.totalBet += action.payload;
    },
    toggleAuto: (state, action) => {
      state.isAuto = action.payload;
    },
    setStopLoss: (state, action) => {
      state.stopLossPoint = action.payload;
    },
    setTakeProfit: (state, action) => {
      state.takeProfitPoint = action.payload;
    },
    reset: (state) => ({ ...state, ...initialState }),
  },
});

export const {
  setInfo,
  setExpiredOn,
  setPrivilege,
  setOriginalBalance,
  setBalance,
  setStopLoss,
  setTakeProfit,
  setAccountType,
  setTotalBet,
  addTotalBet,
  toggleAuto,
  reset,
} = accountSlice.actions;

export const getBalance =
  (isResetOriginalBalance) => async (dispatch, getState) => {
    const {
      auth: { accessToken },
      account: { accountType },
    } = getState((store) => store.auth);
    const user = new User({ accessToken });
    await user.getBalance();

    const { balances } = user;
    if (isResetOriginalBalance) {
      dispatch(setOriginalBalance(balances[accountType]));
    }
    dispatch(setBalance(balances[accountType]));
  };

export const setStopPoint = (data) => (dispatch) => {
  dispatch(setStopLoss(data.stopLossPoint * 1));
  dispatch(setTakeProfit(data.takeProfitPoint * 1));
};

export const setAuto = (payload) => (dispatch) => {
  dispatch(toggleAuto(payload));
};

export const resetAccount = () => (dispatch) => {
  dispatch(getBalance(true));
  dispatch(setTotalBet(0));
  dispatch(setAuto(false));
};

export const changeAccountType = (accountType) => (dispatch) => {
  dispatch(setAccountType(accountType));
  dispatch(resetAccount());
};

export default accountSlice.reducer;
