/* eslint-disable no-console */
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const metaSlice = createSlice({
  name: 'meta',
  initialState: {
    isUpdatedVersion: null,
    lastestVersion: { ver: null, link: null },
    ads: null,
  },
  reducers: {
    setMeta: (state, action) => {
      state.isUpdatedVersion = action.payload.isUpdatedVersion;
      state.lastestVersion.ver = action.payload.lastestVersion;
      const [win, mac] = action.payload.lastestVersionLink.split('|');
      state.lastestVersion.link = process.env.OS === 'win' ? win : mac;
      state.ads = action.payload.ads;
    },
  },
});

export const { setMeta } = metaSlice.actions;

export const getMeta = () => async (dispatch) => {
  const res = await axios(
    `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/v1/meta`,
    {
      headers: { version: process.env.VERSION, exchange: process.env.EXCHANGE },
    }
  );

  dispatch(setMeta(res.data.result));
};

export default metaSlice.reducer;
