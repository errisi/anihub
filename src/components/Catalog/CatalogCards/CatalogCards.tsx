/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Anime } from '../../../types/Anime';
import { CatalogSort } from '../CatalogSort/CatalogSort';
import { AnimeCard } from '../../Card/Card';
import styles from './CatalogCards.module.scss';

type Props = {
  animes: Anime[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const CatalogCards: FC<Props> = ({ animes, setPage }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setPage((p) => p + 1);
    }
  }, [inView]);

  return (
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

        <LinearProgress sx={{ margin: '36px 0 0 0' }} ref={ref} />
      </div>
    </>
  );
};
