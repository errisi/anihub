import { FC } from 'react';
import { Pagination } from '@mui/material';
import { Anime } from '../../../types/Anime';
import { CatalogSort } from '../CatalogSort/CatalogSort';
import { AnimeCard } from '../../Card/Card';

type Props = {
  animes: Anime[];
};

export const CatalogCards: FC<Props> = ({ animes }) => (
  <>
    <div className="catalog__cards-wrapper">
      <div className="catalog__header">
        <h1
          className="catalog__title"
        >
          Аниме
        </h1>

        <CatalogSort />
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
