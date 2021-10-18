import { configureStore } from '@reduxjs/toolkit';

import metaReducer from './slices/metaSlice';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';
import sessionReducer from './slices/sessionSlice';
import priceReducer from './slices/priceSlice';
import awakeningReducer from './slices/awakeningSlice';

export default configureStore({
  reducer: {
    meta: metaReducer,
    auth: authReducer,
    account: accountReducer,
    session: sessionReducer,
    price: priceReducer,
    awakening: awakeningReducer,
  },
  devTools: true,
});
