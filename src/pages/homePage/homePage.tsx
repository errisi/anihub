import { useEffect } from 'react';
import {
  NewReleased,
} from '../../components/Home/NewReleased/NewReleased';
import {
  BestSeasonOngoings,
} from '../../components/Home/BestSeasonOngoings/BestSeasonOngoings';
import {
  ReleaseCalendar,
} from '../../components/Home/ReleaseCalendar/ReleaseCalendar';
import { useAppDispatch } from '../../store/hooks';
import * as BestSeasonOngoingsActions from '../../features/BestSeasonOngoings';
import * as NewReleasedActions from '../../features/NewReleased';
import * as ReleaseCalendarActions from '../../features/ReleaseCalendar';
import { Promo } from '../../components/Home/Promo';
import { Welcome } from '../../components/Home/Welcome';

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
