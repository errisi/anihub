import { FC } from 'react';
import { Pagination } from '@mui/material';
import { Anime } from '../../../types/Anime';
import { AnimeCatalogSort } from '../AnimeCatalogSort/AnimeCatalogSort';
import { AnimeCard } from '../../animeCard/AnimeCard';

type Props = {
  animes: Anime[];
};

export const AnimeCatalogCards: FC<Props> = ({ animes }) => (
  <>
    <div className="catalog__cards-wrapper">
      <div className="catalog__header">
        <h1
          className="catalog__title"
        >
          Аниме
        </h1>

        <AnimeCatalogSort />
      </div>

      <div className="card__catalog-grid">
        {animes.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
          />
        ))}
      </div>

      <div className="catalog__pagination">
        <Pagination count={10} color="primary" />
      </div>
    </div>
  </>
);
