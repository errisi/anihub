/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { Button, Collapse, LinearProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
import { Anime } from '../../../types/Anime';
import { CatalogSort } from '../CatalogSort/CatalogSort';
import { AnimeCard } from '../../Card/Card';
import styles from './CatalogCards.module.scss';
import { AnimeCatalogFilter } from '../CatalogFilter';

type Props = {
  animes: Anime[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
  setUpdateFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterOpened: boolean;
  setIsFilterOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateFilter: boolean;
  windowWidth: number;
};

export const CatalogCards: FC<Props> = ({
  animes,
  setPage,
  hasMore,
  setUpdateFilter,
  isFilterOpened,
  setIsFilterOpened,
  updateFilter,
  windowWidth,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setPage((p) => p + 1);
    }
  }, [inView]);

  const [, setSearchParams] = useSearchParams();

  const handleResetButton = async () => {
    setSearchParams('');

    setUpdateFilter((c) => !c);
  };

  return (
    <>
      <div className={styles.catalog__cards_wrapper}>
        {!!animes.length && (
          <>
            <div className={styles.catalog__header}>
              <h1 className={styles.catalog__title}>Аниме</h1>

              {windowWidth > 1200 && <CatalogSort windowWidth={windowWidth} />}

              <Button
                variant="outlined"
                className={styles.catalog__filter_button}
                onClick={() => setIsFilterOpened((c) => !c)}
              >
                Фильтр
              </Button>
            </div>

            <div className={styles.menu__wrapper}>
              <Collapse
                orientation="vertical"
                className={styles.menu}
                in={isFilterOpened}
              >
                <AnimeCatalogFilter
                  update={updateFilter}
                  setUpdate={setUpdateFilter}
                  setIsFilterOpened={setIsFilterOpened}
                  windowWidth={windowWidth}
                />
              </Collapse>
              {isFilterOpened && (
                <button
                  type="button"
                  aria-label="s"
                  className={styles.menu__under}
                  onClick={() => setIsFilterOpened((c) => !c)}
                >
                  <div className={styles.menu__under} />
                </button>
              )}
            </div>

            <div className={styles.card__catalog_grid}>
              {animes.map((anime) => (
                <AnimeCard to="../" key={anime.id} anime={anime} />
              ))}
            </div>
          </>
        )}

        {!animes.length && (
          <div className={styles.not_found}>
            <h3 className={styles.not_found__title}>
              Нет ничего подходящего по заданным критериям поиска
            </h3>
            <img
              src="/images/no-found.png"
              alt=""
              className={styles.not_found__image}
            />
            <Button variant="outlined" onClick={handleResetButton}>
              Сбросить фильр
            </Button>
          </div>
        )}

        {hasMore && <LinearProgress sx={{ margin: '36px 0 0 0' }} ref={ref} />}
      </div>
    </>
  );
};
