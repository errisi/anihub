import { configureStore } from '@reduxjs/toolkit';
import BestSeasonOngoingsReducer from '../features/BestSeasonOngoings';
import NewReleasedReducer from '../features/NewReleased';
import ReleaseCalendarReducer from '../features/ReleaseCalendar';
import CatalogAnimesReducer from '../features/CatalogAnimes';
import SearchAnimesReducer from '../features/SearchAnimes';
import UserReducer from '../features/User';
import NotificationsReducer from '../features/Notifications';

const store = configureStore({
  reducer: {
    BestSeasonOngoings: BestSeasonOngoingsReducer,
    NewReleased: NewReleasedReducer,
    ReleaseCalendar: ReleaseCalendarReducer,
    CatalogAnimes: CatalogAnimesReducer,
    SearchAnimes: SearchAnimesReducer,
    User: UserReducer,
    Notifications: NotificationsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
