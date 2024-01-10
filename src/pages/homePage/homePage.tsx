import { useEffect } from 'react';
import {
  NewReleased,
} from '../../components/appHomePage/NewReleased/NewReleased';
import {
  BestSeasonOngoings,
} from '../../components/appHomePage/BestSeasonOngoings/BestSeasonOngoings';
import { useAppDispatch } from '../../store/hooks';
import * as BestSeasonOngoingsActions from '../../features/BestSeasonOngoings';
import * as NewReleasedActions from '../../features/NewReleased';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  // const { animes, loading, error } = useAppSelector(state => state.anime);

  useEffect(() => {
    dispatch(BestSeasonOngoingsActions.init());
    dispatch(NewReleasedActions.init());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <BestSeasonOngoings />

      <NewReleased />

      {/* <ReleaseCalendar /> */}
    </div>
  );
};
