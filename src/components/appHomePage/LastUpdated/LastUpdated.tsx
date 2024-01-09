import { FC } from 'react';
import { Anime } from '../../../types/Anime';
import { AnimeCard } from '../../animeCard/AnimeCard';

type Props = {
  animes: Anime[];
};

export const LastUpdated: FC<Props> = ({ animes }) => (
  <>
    <h1 className="home__title">
      Последние обновленные
    </h1>
    <div className="card__home-grid">
      {animes.map((anime) => (
        <AnimeCard anime={anime} />
      ))}
    </div>
  </>
);
