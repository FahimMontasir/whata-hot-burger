import {configureStore} from '@reduxjs/toolkit';
import {mainApi} from './api';
import {reHydrateStore} from './middlewares/localStorage';

import localStorageAuth from './slices/localStorageAuth';

export const store = configureStore({
  reducer: {
    localStorageAuth: localStorageAuth,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  preloadedState: {localStorageAuth: reHydrateStore()},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mainApi.middleware),
});
