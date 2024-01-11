import { configureStore } from '@reduxjs/toolkit';
import BestSeasonOngoingsReducer from '../features/BestSeasonOngoings';
import NewReleasedReducer from '../features/NewReleased';
import ReleaseCalendarReducer from '../features/ReleaseCalendar';

const store = configureStore({
  reducer: {
    BestSeasonOngoings: BestSeasonOngoingsReducer,
    NewReleased: NewReleasedReducer,
    ReleaseCalendar: ReleaseCalendarReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
