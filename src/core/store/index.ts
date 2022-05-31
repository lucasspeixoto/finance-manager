import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from './auth-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
