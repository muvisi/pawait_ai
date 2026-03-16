import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './auth/index';

import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  // timeout: 2000, //Set the timeout function to 2 seconds
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: persistedReducer,
  middleware: [thunk],
});

// store.dispatch(updateVersion())

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export const persistor = persistStore(store);
