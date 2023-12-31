import { configureStore } from '@reduxjs/toolkit';
import animesReducer from '../features/anime';

const store = configureStore({
  reducer: {
    anime: animesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
