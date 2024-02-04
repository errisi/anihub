import { FC, useEffect } from 'react';
import { Button, LinearProgress } from '@mui/material';
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

      {loading && <LinearProgress />}

      {error && !loading && (
        <>
          <p>
            {error}
          </p>
          <Button
            onClick={refresh}
          >
            Try Again
          </Button>
        </>
      )}

      {!loading && !error && (
        <div className={styles.home__card__grid}>
          {animes.map((anime) => (
            <AnimeCard
              to="../"
              key={anime.id}
              anime={anime}
            />
          ))}
        </div>
      )}
    </div>
  );
};
