import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import { useSearchParams } from 'react-router-dom';

import { Button, SelectChangeEvent, Stack } from '@mui/material';
import { getGenres } from '../../../api/animes';
import {
  AnimeCatalogFilterGenreBlock,
} from './filterBlocks/AnimeCatalogFilterGenreBlock';
import {
  AnimeCatalogFilterTypeBlock,
} from './filterBlocks/AnimeCatalogFilterTypeBlock';
import {
  AnimeCatalogFilterStatusBlock,
} from './filterBlocks/AnimeCatalogFilterStatusBlock';
import {
  AnimeCatalogFilterYearsBlock,
} from './filterBlocks/AnimeCatalogFilterYearsBlock';
import {
  AnimeCatalogFilterScoreBlock,
} from './filterBlocks/AnimeCatalogFilterScoreBlock';
import {
  AnimeCatalogFilterRatingBlock,
} from './filterBlocks/AnimeCatalogFilterRatingBlock';
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
      <div className="catalog__filter-wrapper">
        <h2
          className="catalog__filter-title"
        >
          Фильтр
        </h2>

        <Stack
          spacing={3}
          sx={{ width: 300 }}
        >
          <AnimeCatalogFilterYearsBlock
            selectedYears={selectedYears}
            handleYearsSelect={handleYearsSelect}
          />

          <AnimeCatalogFilterGenreBlock
            genresList={genresList}
            selectedGeners={selectedGeners}
            handleGenersSelect={handleGenersSelect}
          />

          <AnimeCatalogFilterTypeBlock
            typesList={typesList}
            selectedTypes={selectedTypes}
            handleTypesSelect={handleTypesSelect}
          />

          <AnimeCatalogFilterStatusBlock
            statusList={statusList}
            selectedStatus={selectedStatus}
            handleStatusSelect={handleStatusSelect}
          />

          <AnimeCatalogFilterScoreBlock
            scoreList={scoreList}
            selectedScore={selectedScore}
            handleScoreSelect={handleScoreSelect}
          />

          <AnimeCatalogFilterRatingBlock
            raitingsList={raitingsList}
            selectedRaitings={selectedRaitings}
            handleRaitingsSelect={handleRaitingsSelect}
          />

          <Button
            variant="contained"
            fullWidth
            className="catalog__filter__button"
          >
            Применить
          </Button>
        </Stack>

      </div>
    </>
  );
};
