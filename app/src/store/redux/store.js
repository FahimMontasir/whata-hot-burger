import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
const createDebugger = require('redux-flipper').default;
//
import {mainApi} from './api';
import localStorageAuth from './slices/localStorageAuth';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, localStorageAuth);

export const store = configureStore({
  reducer: {
    localStorageAuth: persistedReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      mainApi.middleware,
      createDebugger(),
    ),
});

export const persistor = persistStore(store);
