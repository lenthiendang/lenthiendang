import { createSlice } from '@reduxjs/toolkit';

import Candle from '../../class/Candles';

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

export const updateCandles = () => (dispatch, getState) => {
  const {
    price: { list },
  } = getState((state) => state);

  const candle = new Candle(list);
  candle.updateCandles();
  dispatch(setList(candle.list));
};

export default priceSlice.reducer;
