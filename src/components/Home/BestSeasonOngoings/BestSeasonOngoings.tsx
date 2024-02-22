import { FC, useEffect } from 'react';
import { Box, Button, Skeleton } from '@mui/material';
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

  useEffect(() => {
    if (error && !loading) {
      setTimeout(() => {
        refresh();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return (
    <div className={styles.home__block}>
      <h1 className={styles.home__block__title_best_ongoings}>
        Лучшие онгоинги сезона
      </h1>

      {loading && (
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          variant="rectangular"
          className={styles.home__carousel__wrapper}
          height={354}
        />
      )}

      {error && !loading && (
        <>
          <Box
            sx={{ bgcolor: 'grey.900' }}
            className={styles.home__carousel__wrapper}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <p>{error}</p>
            <Button onClick={refresh}>Try Again</Button>
          </Box>
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
