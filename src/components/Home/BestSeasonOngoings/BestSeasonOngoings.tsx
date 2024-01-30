import { FC } from 'react';
import { Button, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import * as BestSeasonOngoingsActions
  from '../../../features/BestSeasonOngoings';
import styles from './BestSeasonOngoings.module.scss';
import { AnimeSlider } from '../../Slider/AnimeSlider';

export const BestSeasonOngoings: FC = () => {
  const dispatch = useAppDispatch();

  const {
    bestSeasonOngoings: animes,
    loading,
    error,
  } = useAppSelector((state) => state.BestSeasonOngoings);

  const refresh = () => {
    dispatch(BestSeasonOngoingsActions.set([]));
    dispatch(BestSeasonOngoingsActions.setError(''));
    dispatch(BestSeasonOngoingsActions.init());
  };

  return (
    <div className={styles.home__block}>
      <h1 className={styles.home__block__title_best_ongoings}>
        Лучшие онгоинги сезона
      </h1>

      {loading && <LinearProgress />}

      {error && !loading && (
        <>
          <p>{error}</p>
          <Button onClick={refresh}>Try Again</Button>
        </>
      )}

      {!loading && !error && (
        <div className={styles.home__carousel__wrapper}>
          <AnimeSlider animes={animes} />
        </div>
      )}
    </div>
  );
};
