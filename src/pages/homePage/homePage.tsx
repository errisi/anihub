import { useEffect } from 'react';
import {
  NewReleased,
} from '../../components/appHomePage/NewReleased/NewReleased';
import {
  BestSeasonOngoings,
} from '../../components/appHomePage/BestSeasonOngoings/BestSeasonOngoings';
import {
  ReleaseCalendar,
} from '../../components/appHomePage/ReleaseCalendar/ReleaseCalendar';
import { useAppDispatch } from '../../store/hooks';
import * as BestSeasonOngoingsActions from '../../features/BestSeasonOngoings';
import * as NewReleasedActions from '../../features/NewReleased';
import * as ReleaseCalendarActions from '../../features/ReleaseCalendar';
import { Promo } from '../../components/appHomePage/Promo';
import { Welcome } from '../../components/appHomePage/Welcome';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(BestSeasonOngoingsActions.init());
    dispatch(NewReleasedActions.init());
    dispatch(ReleaseCalendarActions.init());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <Welcome />

      <BestSeasonOngoings />

      <ReleaseCalendar />

      <NewReleased />

      <Promo />
    </div>
  );
};
