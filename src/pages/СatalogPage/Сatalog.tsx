/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Catalog.module.scss';
import {
  CatalogCards,
} from '../../components/Catalog/CatalogCards/CatalogCards';
import {
  AnimeCatalogFilter,
} from '../../components/Catalog/CatalogFilter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as CatalogAnimesActions from '../../features/CatalogAnimes';
import { Gener } from '../../types/Gener';
import { getCatalogAnimes, getGenres } from '../../api/animes';
import { getPreparedApiUrl } from '../../helpers/getPreparedApiUrl';

export const Сatalog = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { catalogAnimes: animes } = useAppSelector(
    (state) => state.CatalogAnimes,
  );

  const [genres, setGenres] = useState<Gener[]>([]);

  useEffect(() => {
    getGenres()
      .then(setGenres);
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
    setPage(0);
    dispatch(CatalogAnimesActions.set([]));

    dispatch(CatalogAnimesActions.init(`${preparedApiUrl}&page=${page}`));
  }, [preparedApiUrl]);

  useEffect(() => {
    getCatalogAnimes(`${preparedApiUrl}&page=${page}`)
      .then((data) => (
        dispatch(CatalogAnimesActions.set([...animes, ...data]))
      ));
  }, [page]);

  return (
    <>
      <div className={styles.catalog}>
        <CatalogCards
          animes={animes}
          setPage={setPage}
        />
        <AnimeCatalogFilter />
      </div>
    </>
  );
};
