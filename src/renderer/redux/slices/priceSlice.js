import { createSlice } from '@reduxjs/toolkit';

import Candle from '../../class/Candles';

const initCandleList = [
  { time: '2021-08-23 09:58:14', session: 0, type: true },
  { time: '2021-08-23 09:58:14', session: 1, type: true },
  { time: '2021-08-23 09:58:14', session: 2, type: false },
  { time: '2021-08-23 09:58:14', session: 3, type: true },
  { time: '2021-08-23 09:58:14', session: 4, type: false },
  { time: '2021-08-23 09:58:14', session: 5, type: true },
  { time: '2021-08-23 09:58:14', session: 6, type: false },
  { time: '2021-08-23 09:58:14', session: 7, type: false },
  { time: '2021-08-23 09:58:14', session: 8, type: false },
  { time: '2021-08-23 09:58:14', session: 9, type: true },
  { time: '2021-08-23 09:58:14', session: 10, type: false },
  { time: '2021-08-23 09:58:14', session: 11, type: false },
  { time: '2021-08-23 09:58:14', session: 12, type: true },
  { time: '2021-08-23 09:58:14', session: 13, type: true },
  { time: '2021-08-23 09:58:14', session: 14, type: false },
  { time: '2021-08-23 09:58:14', session: 15, type: false },
  { time: '2021-08-23 09:58:14', session: 16, type: true },
  { time: '2021-08-23 09:58:14', session: 17, type: true },
  { time: '2021-08-23 09:58:14', session: 18, type: false },
  { time: '2021-08-23 09:58:14', session: 19, type: false },
  { time: '2021-08-23 09:58:14', session: 20, type: false },
  { time: '2021-08-23 09:58:14', session: 21, type: true },
  { time: '2021-08-23 09:58:14', session: 22, type: true },
  { time: '2021-08-23 09:58:14', session: 23, type: false },
  { time: '2021-08-23 09:58:14', session: 24, type: false },
  { time: '2021-08-23 09:58:14', session: 25, type: false },
  { time: '2021-08-23 09:58:14', session: 26, type: true },
  { time: '2021-08-23 09:58:14', session: 27, type: true },
  { time: '2021-08-23 09:58:14', session: 28, type: true },
  { time: '2021-08-23 09:58:14', session: 29, type: false },
  { time: '2021-08-23 09:58:14', session: 30, type: true },
];

const priceSlice = createSlice({
  name: 'price',
  initialState: {
    list: initCandleList,
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
