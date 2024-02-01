import { authSlice } from '@/redux/services/auth/auth.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createWrapper } from 'next-redux-wrapper';
import { api } from './api/base.api';
import { useDispatch } from 'react-redux';
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [authSlice.name]: authSlice.reducer
});
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware)
});
const makeStore = () => store;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export const wrapper = createWrapper<AppStore>(makeStore);
setupListeners(store.dispatch);
