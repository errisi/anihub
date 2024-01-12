import { configureStore } from '@reduxjs/toolkit';
import BestSeasonOngoingsReducer from '../features/BestSeasonOngoings';
import NewReleasedReducer from '../features/NewReleased';
import ReleaseCalendarReducer from '../features/ReleaseCalendar';
import CatalogAnimesReducer from '../features/CatalogAnimes';

const store = configureStore({
  reducer: {
    BestSeasonOngoings: BestSeasonOngoingsReducer,
    NewReleased: NewReleasedReducer,
    ReleaseCalendar: ReleaseCalendarReducer,
    CatalogAnimes: CatalogAnimesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
