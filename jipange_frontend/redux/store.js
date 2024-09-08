import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

export default function createAppStore(initialState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}