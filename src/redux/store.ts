import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import jokesReducer from 'redux/jokesSlice';
import serverDataReducer from 'redux/serverDataSlice';

export const store = configureStore({
  reducer: {
    jokes: jokesReducer,
    serverData: serverDataReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
