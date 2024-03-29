/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, LinearProgress } from '@mui/material';
import styles from './Catalog.module.scss';
import { CatalogCards }
  from '../../components/Catalog/CatalogCards/CatalogCards';
import { AnimeCatalogFilter } from '../../components/Catalog/CatalogFilter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as CatalogAnimesActions from '../../features/CatalogAnimes';
import { Gener } from '../../types/Gener';
import { getCatalogAnimes, getGenres } from '../../api/animes';
import { getPreparedApiUrl } from '../../helpers/getPreparedApiUrl';

export const Сatalog = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(false);
  const [updateFilter, setUpdateFilter] = useState(false);
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  useEffect(() => {
    if (isFilterOpened) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isFilterOpened]);

  const dispatch = useAppDispatch();

  const {
    catalogAnimes: animes,
    loading,
    error,
  } = useAppSelector((state) => state.CatalogAnimes);

  const [genres, setGenres] = useState<Gener[]>([]);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  const [searchParams] = useSearchParams();

  const selectedYears
  = searchParams.getAll('season').map(Number).length > 0
    ? searchParams.getAll('season').map(Number)
    : [1959, 2024];
  const selectedGenres = searchParams.getAll('genre') || [];
  const selectedTypes = searchParams.getAll('kind') || [];
  const selectedStatus = searchParams.get('status') || '';
  const selectedScore = searchParams.get('score') || '';
  const selectedRatings = searchParams.getAll('rating') || [];
  const selectedOrder = searchParams.get('order') || 'Рейтингу';

  const preparedApiUrl = getPreparedApiUrl(
    genres,
    selectedYears,
    selectedGenres,
    selectedTypes,
    selectedStatus,
    selectedScore,
    selectedRatings,
    selectedOrder,
  );

  useEffect(() => {
    setPage(1);
    dispatch(CatalogAnimesActions.set([]));
    setHasMore(true);

    dispatch(CatalogAnimesActions.init(`${preparedApiUrl}&page=${page}`));
  }, [preparedApiUrl]);

  useEffect(() => {
    if (hasMore) {
      getCatalogAnimes(`${preparedApiUrl}&page=${page}`).then((data) => {
        const isSameLength = animes.length === animes.concat(data).length;

        if (isSameLength) {
          setHasMore(false);
        } else {
          dispatch(CatalogAnimesActions.set([...animes, ...data]));
        }
      });
    }
  }, [page]);

  const refresh = () => {
    dispatch(CatalogAnimesActions.set([]));
    dispatch(CatalogAnimesActions.setError(''));
    setPage(1);
    setHasMore(true);

    dispatch(CatalogAnimesActions.init(`${preparedApiUrl}&page=${page}`));
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {loading && <LinearProgress />}

      {error && !loading && (
        <>
          <p>{error}</p>
          <Button onClick={refresh}>Try Again</Button>
        </>
      )}

      {!error && !loading && (
        <div className={styles.catalog}>
          <CatalogCards
            animes={animes}
            setPage={setPage}
            hasMore={hasMore}
            setUpdateFilter={setUpdateFilter}
            isFilterOpened={isFilterOpened}
            setIsFilterOpened={setIsFilterOpened}
            updateFilter={updateFilter}
            windowWidth={windowWidth}
          />

          {windowWidth >= 1200 && (
            <AnimeCatalogFilter
              update={updateFilter}
              setUpdate={setUpdateFilter}
              setIsFilterOpened={setIsFilterOpened}
            />
          )}
        </div>
      )}
    </>
  );
};
