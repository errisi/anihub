import React, {
  FC,
  useEffect,
  useState,
} from 'react';

import { Button, Stack } from '@mui/material';
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

export const AnimeCatalogFilter: FC = () => {
  const [genresList, setGenresList] = useState<string[]>([]);
  const typesList = ['Аниме Сериал', 'Аниме Фильм', 'OVA', 'ONA', 'Спешл'];
  const statusList = ['Анонс', 'Вышел', 'Онгоинг'];
  const scoreList = ['Выше 9', 'Выше 8', 'Выше 7', 'Выше 6', 'Выше 5'];
  const raitingsList = ['G', 'PG', 'PG-13', 'R', 'R-17', 'R+'];

  const [selectedYears, setSelectedYears]
    = React.useState<number[]>([1959, 2024]);
  const [selectedGeners, setSelectedGeners] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [selectedScore, setSelectedScore] = React.useState('');
  const [selectedRaitings, setSelectedRaitings] = useState<string[]>([]);

  useEffect(() => {
    getGenres()
      .then((r: string) => setGenresList([...new Set<string>(r)]))
      .catch((error) => {
        setGenresList([...error]);
      });
  }, []);

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
            setSelectedYears={setSelectedYears}
          />

          <AnimeCatalogFilterGenreBlock
            genresList={genresList}
            selectedGeners={selectedGeners}
            setSelectedGeners={setSelectedGeners}
          />

          <AnimeCatalogFilterTypeBlock
            typesList={typesList}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />

          <AnimeCatalogFilterStatusBlock
            statusList={statusList}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />

          <AnimeCatalogFilterScoreBlock
            scoreList={scoreList}
            selectedScore={selectedScore}
            setSelectedScore={setSelectedScore}
          />

          <AnimeCatalogFilterRatingBlock
            raitingsList={raitingsList}
            selectedRaitings={selectedRaitings}
            setSelectedRaitings={setSelectedRaitings}
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
