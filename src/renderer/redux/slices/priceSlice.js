import { createSlice } from '@reduxjs/toolkit';

import Candle from '../../class/Candle';

const priceSlice = createSlice({
  name: 'price',
  initialState: {
    list: [],
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setList } = priceSlice.actions;

export const updateCandles = () => async (dispatch, getState) => {
  const {
    auth: { accessToken },
    account: { candleCount },
    price: { list },
  } = getState((store) => store);
  if (accessToken) {
    const candle = new Candle(list);
    if (!candle.list.length) {
      await candle.initCandles(candleCount, accessToken);
    } else {
      await candle.updateLatestCandles(accessToken);
    }
    dispatch(setList(candle.list));
  }
};

export default priceSlice.reducer;
