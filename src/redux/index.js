import { configureStore } from '@reduxjs/toolkit';

import priceReducer from './slices/priceSlice';
import sessionReducer from './slices/sessionSlice';

export default configureStore({
  reducer: {
    price: priceReducer,
    session: sessionReducer,
  },
  devTools: true,
});
