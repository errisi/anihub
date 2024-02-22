import { FC, useEffect } from 'react';
import { Box, Button, Skeleton } from '@mui/material';
import { AnimeCard } from '../../Card/Card';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import * as NewReleasedActions from '../../../features/NewReleased';
import styles from './NewReleased.module.scss';

export const NewReleased: FC = () => {
  const dispatch = useAppDispatch();

  const {
    NewReleased: animes,
    loading,
    error,
  } = useAppSelector((state) => state.NewReleased);

  const refresh = () => {
    dispatch(NewReleasedActions.set([]));
    dispatch(NewReleasedActions.setError(''));
    dispatch(NewReleasedActions.init());
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
      <h1 className={styles.home__block__title_new_relised}>
        Недавно вышедшие
      </h1>

      {loading && (
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          height={354}
          variant="rectangular"
          className={styles.home__block}
        />
      )}

      {error && !loading && (
        <>
          <Box
            sx={{ bgcolor: 'grey.900' }}
            className={styles.home__block}
            height={354}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <p>{error}</p>
            <Button onClick={refresh}>Try Again</Button>
          </Box>
        </>
      )}

      {!loading && !error && (
        <div className={styles.home__card__grid}>
          {animes.map((anime) => (
            <AnimeCard to="../" key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};
