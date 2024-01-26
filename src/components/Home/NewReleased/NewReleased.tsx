import { FC } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { AnimeCard } from '../../Card/Card';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import * as NewReleasedActions from '../../../features/NewReleased';

export const NewReleased: FC = () => {
  const dispatch = useAppDispatch();

  const {
    NewReleased: animes,
    loading,
    error,
  } = useAppSelector((state) => state.NewReleased);

  const refresh = () => {
    dispatch(NewReleasedActions.init());
  };

  return (
    <div className="home__block">
      <h1 className="home__block__title-new-relised">
        Недавно вышедшие
      </h1>

      {loading && <CircularProgress />}

      {error && (
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
        <div className="card__home-grid">
          {animes.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
            />
          ))}
        </div>
      )}
    </div>
  );
};
