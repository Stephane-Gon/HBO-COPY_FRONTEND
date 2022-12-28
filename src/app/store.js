import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../features/auth/authSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import tmdbReducer from '../features/tmdb/tmdbSlice'

import { apiSlice } from '../features/apis/api';
import { tmdbApiSlice } from '../features/apis/tmdbApi';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['auth', 'tmdb'],
}

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
  auth: authReducer,
  tmdb: tmdbReducer,
  notifications: notificationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware, tmdbApiSlice.middleware)
    
})

export const persistor = persistStore(store)