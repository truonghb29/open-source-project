import { combineReducers, configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: combineReducers({}),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
