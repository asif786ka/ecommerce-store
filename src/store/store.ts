import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.ts';
import productApi from './productApi.ts';

// Configure Redux store with cart slice and product API slice
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
