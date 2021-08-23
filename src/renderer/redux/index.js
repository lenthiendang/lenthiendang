import { configureStore } from '@reduxjs/toolkit';

import priceReducer from './slices/priceSlice';
import sessionReducer from './slices/sessionSlice';
import awakeningReducer from './slices/awakeningSlice';
import accountReducer from './slices/accountSlice';

export default configureStore({
  reducer: {
    price: priceReducer,
    account: accountReducer,
    session: sessionReducer,
    awakening: awakeningReducer,
  },
  devTools: true,
});
