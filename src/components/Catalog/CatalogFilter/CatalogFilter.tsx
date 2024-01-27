import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import { useSearchParams } from 'react-router-dom';
import { Button, SelectChangeEvent, Stack } from '@mui/material';
import styles from './CatalogFilter.module.scss';

import { getGenres } from '../../../api/animes';
import {
  CatalogFilterGenreBlock,
} from './filterBlocks/CatalogFilterGenreBlock/CatalogFilterGenreBlock';
import {
  CatalogFilterTypeBlock,
} from './filterBlocks/CatalogFilterTypeBlock/CatalogFilterTypeBlock';
import {
  CatalogFilterStatusBlock,
} from './filterBlocks/CatalogFilterStatusBlock/CatalogFilterStatusBlock';
import {
  CatalogFilterYearsBlock,
} from './filterBlocks/CatalogFilterYearsBlock/CatalogFilterYearsBlock';
import {
  CatalogFilterScoreBlock,
} from './filterBlocks/CatalogFilterScoreBlock/CatalogFilterScoreBlock';
import {
  CatalogFilterRatingBlock,
} from './filterBlocks/CatalogFilterRatingBlock/CatalogFilterRatingBlock';
import { getSearchWith } from '../../../utils/getSearchWith';
import { Params } from '../../../types/Params';
import { Gener } from '../../../types/Gener';

export const AnimeCatalogFilter: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [genresList, setGenresList] = useState<string[]>([]);
  const typesList = ['Аниме Сериал', 'Аниме Фильм', 'OVA', 'ONA', 'Спешл'];
  const statusList = ['Анонс', 'Вышел', 'Онгоинг'];
  const scoreList = ['Выше 9', 'Выше 8', 'Выше 7', 'Выше 6', 'Выше 5'];
  const raitingsList = ['G', 'PG', 'PG-13', 'R', 'R+'];

  const selectedYears
    = searchParams.getAll('season').map(Number).length > 0
      ? searchParams.getAll('season').map(Number)
      : [1959, 2024];
  const selectedGeners = searchParams.getAll('genre') || [];
  const selectedTypes = searchParams.getAll('kind') || [];
  const selectedStatus = searchParams.get('status') || '';
  const selectedScore = searchParams.get('score') || '';
  const selectedRaitings = searchParams.getAll('rating') || [];

  useEffect(() => {
    getGenres()
      .then((response) => response.map((gener: Gener) => gener.russian))
      .then((r: string) => setGenresList([...new Set<string>(r)]))
      .catch((error) => {
        setGenresList([...error]);
      });
  }, []);

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleGenersSelect
  = (_: React.SyntheticEvent, value: string[]) => {
    setSearchWith({ genre: value });
  };

  const handleTypesSelect
  = (_: React.SyntheticEvent, value: string[]) => {
    setSearchWith({ kind: value });
  };

  const handleStatusSelect = (event: SelectChangeEvent) => {
    setSearchWith({ status: event.target.value as string });
  };

  const handleYearsSelect = (_: Event, newValue: number | number[]) => {
    setSearchWith({ season: newValue as number[] });
  };

  const handleScoreSelect = (event: SelectChangeEvent) => {
    setSearchWith({ score: event.target.value as string });
  };

  const handleRaitingsSelect
  = (_: React.SyntheticEvent, value: string[]) => {
    setSearchWith({ rating: value });
  };

  return (
    <>
      <div className={styles.catalog__filter_wrapper}>
        <h2
          className={styles.catalog__filter_title}
        >
          Фильтр
        </h2>

        <Stack
          spacing={3}
          sx={{ width: 300 }}
        >
          <CatalogFilterYearsBlock
            selectedYears={selectedYears}
            handleYearsSelect={handleYearsSelect}
          />

          <CatalogFilterGenreBlock
            genresList={genresList}
            selectedGeners={selectedGeners}
            handleGenersSelect={handleGenersSelect}
          />

          <CatalogFilterTypeBlock
            typesList={typesList}
            selectedTypes={selectedTypes}
            handleTypesSelect={handleTypesSelect}
          />

          <CatalogFilterStatusBlock
            statusList={statusList}
            selectedStatus={selectedStatus}
            handleStatusSelect={handleStatusSelect}
          />

          <CatalogFilterScoreBlock
            scoreList={scoreList}
            selectedScore={selectedScore}
            handleScoreSelect={handleScoreSelect}
          />

          <CatalogFilterRatingBlock
            raitingsList={raitingsList}
            selectedRaitings={selectedRaitings}
            handleRaitingsSelect={handleRaitingsSelect}
          />

          <Button
            variant="contained"
            fullWidth
            className={styles.catalog__filter__button}
          >
            Применить
          </Button>
        </Stack>

      </div>
    </>
  );
};
