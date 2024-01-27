import { FC } from 'react';
import { Pagination } from '@mui/material';
import { Anime } from '../../../types/Anime';
import { CatalogSort } from '../CatalogSort/CatalogSort';
import { AnimeCard } from '../../Card/Card';
import styles from './CatalogCards.module.scss';

type Props = {
  animes: Anime[];
};

export const CatalogCards: FC<Props> = ({ animes }) => (
  <>
    <div className={styles.catalog__cards_wrapper}>
      <div className={styles.catalog__header}>
        <h1
          className={styles.catalog__title}
        >
          Аниме
        </h1>

        <CatalogSort />
      </div>

      <div className={styles.card__catalog_grid}>
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
