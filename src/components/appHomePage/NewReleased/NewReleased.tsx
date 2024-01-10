import { FC } from 'react';
import { AnimeCard } from '../../animeCard/AnimeCard';
import { useAppSelector } from '../../../store/hooks';

export const NewReleased: FC = () => {
  const { NewReleased: animes }
  = useAppSelector((state) => state.NewReleased);

  return (
    <div className="home__block">
      <h1 className="home__block__title-new-relised">
        Недавно вышедшие
      </h1>

      <div className="card__home-grid">
        {animes.map((anime) => (
          <AnimeCard anime={anime} />
        ))}
      </div>
    </div>
  );
};
