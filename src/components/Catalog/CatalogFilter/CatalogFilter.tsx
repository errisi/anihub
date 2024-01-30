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

type Props = {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AnimeCatalogFilter: FC<Props> = ({ update, setUpdate }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [genresList, setGenresList] = useState<string[]>([]);
  const typesList = ['Аниме Сериал', 'Аниме Фильм', 'OVA', 'ONA', 'Спешл'];
  const statusList = ['Анонс', 'Вышел', 'Онгоинг'];
  const scoreList = ['Выше 9', 'Выше 8', 'Выше 7', 'Выше 6', 'Выше 5'];
  const raitingsList = ['G', 'PG', 'PG-13', 'R', 'R+'];

  useEffect(() => {
    getGenres()
      .then((response) => response.map((gener: Gener) => gener.russian))
      .then((r: string) => setGenresList([...new Set<string>(r)]))
      .catch((error) => {
        setGenresList([...error]);
      });
  }, []);

  const selectedYears
  = searchParams.getAll('season').map(Number).length > 0
    ? searchParams.getAll('season').map(Number)
    : [1959, 2024];
  const selectedGenres = searchParams.getAll('genre') || [];
  const selectedTypes = searchParams.getAll('kind') || [];
  const selectedStatus = searchParams.get('status') || '';
  const selectedScore = searchParams.get('score') || '';
  const selectedRatings = searchParams.getAll('rating') || [];

  const [tempSelectedYears, setTempSelectedYears]
    = useState<number[]>([1959, 2024]);
  const [tempSelectedGeners, setTempSelectedGeners] = useState<string[]>([]);
  const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>([]);
  const [tempSelectedStatus, setTempSelectedStatus] = useState('');
  const [tempSelectedScore, setTempSelectedScore] = useState('');
  const [tempSelectedRaitings, setTempSelectedRaitings]
    = useState<string[]>([]);

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleGenersSelect
  = (_: React.SyntheticEvent, value: string[]) => {
    setTempSelectedGeners(value);
  };

  const handleTypesSelect
  = (_: React.SyntheticEvent, value: string[]) => {
    setTempSelectedTypes(value);
  };

  const handleStatusSelect = (event: SelectChangeEvent) => {
    setTempSelectedStatus(event.target.value as string);
  };

  const handleYearsSelect = (_: Event, newValue: number | number[]) => {
    setTempSelectedYears(newValue as number[]);
  };

  const handleScoreSelect = (event: SelectChangeEvent) => {
    setTempSelectedScore(event.target.value as string);
  };

  const handleRaitingsSelect
  = (_: React.SyntheticEvent, value: string[]) => {
    setTempSelectedRaitings(value);
  };

  const handleApplyButton = async () => {
    await setSearchWith({
      genre: tempSelectedGeners,
      kind: tempSelectedTypes,
      status: tempSelectedStatus,
      season: tempSelectedYears,
      score: tempSelectedScore,
      rating: tempSelectedRaitings,
    });

    setUpdate((c) => !c);
  };

  useEffect(() => {
    setTempSelectedGeners(selectedGenres);
    setTempSelectedTypes(selectedTypes);
    setTempSelectedStatus(selectedStatus);
    setTempSelectedYears(selectedYears);
    setTempSelectedScore(selectedScore);
    setTempSelectedRaitings(selectedRatings);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <div className={styles.catalog__filter}>
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
            selectedYears={tempSelectedYears}
            handleYearsSelect={handleYearsSelect}
          />

          <CatalogFilterGenreBlock
            genresList={genresList}
            selectedGeners={tempSelectedGeners}
            handleGenersSelect={handleGenersSelect}
          />

          <CatalogFilterTypeBlock
            typesList={typesList}
            selectedTypes={tempSelectedTypes}
            handleTypesSelect={handleTypesSelect}
          />

          <CatalogFilterStatusBlock
            statusList={statusList}
            selectedStatus={tempSelectedStatus}
            handleStatusSelect={handleStatusSelect}
          />

          <CatalogFilterScoreBlock
            scoreList={scoreList}
            selectedScore={tempSelectedScore}
            handleScoreSelect={handleScoreSelect}
          />

          <CatalogFilterRatingBlock
            raitingsList={raitingsList}
            selectedRaitings={tempSelectedRaitings}
            handleRaitingsSelect={handleRaitingsSelect}
          />

          <Button
            variant="contained"
            fullWidth
            className={styles.catalog__filter__button}
            onClick={handleApplyButton}
          >
            Применить
          </Button>
        </Stack>

      </div>
    </div>
  );
};
