import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { FetchSlice } from './fetchSlice';


export const store    =configureStore({
    reducer: {
      [FetchSlice.name]: FetchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false }),
  });
export const makeStore   = () =>configureStore({
    reducer: {
      [FetchSlice.name]: FetchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false }),
  });



export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunkAction<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();

