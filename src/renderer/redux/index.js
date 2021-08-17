import { configureStore } from '@reduxjs/toolkit';

import priceReducer from './slices/priceSlice';
import sessionReducer from './slices/sessionSlice';
import awakeningReducer from './slices/awakeningSlice';

export default configureStore({
  reducer: {
    price: priceReducer,
    session: sessionReducer,
    awakening: awakeningReducer,
  },
  devTools: true,
});
