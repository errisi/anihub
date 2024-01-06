import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getGenres } from '../../../api/animes';

export const AnimeCatalogFilter: FC = () => {
  const [genresList, setGenresList] = useState<string[]>([]);
  const [selectedGeners, setSelectedGeners] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const typesList = ['Аниме Сериал', 'Аниме Фильм', 'OVA', 'ONA', 'Спешл'];

  useEffect(() => {
    getGenres()
      .then((r: string) => setGenresList([...new Set<string>(r)]))
      .catch((error) => {
        setGenresList([...error]);
      });
  }, []);

  const setSelectedGenersAction
    = (_: React.SyntheticEvent, value: string[]) => {
      setSelectedGeners(value);
    };

  const setSelectedTypesAction
  = (_: React.SyntheticEvent, value: string[]) => {
    setSelectedTypes(value);
  };

  const sortedGenresList = useMemo(() => {
    return genresList.sort((a, b) => a.localeCompare(b));
  }, [genresList]);

  return (
    <>
      <div className="catalog__filter-wrapper">
        <h2
          className="catalog__filter-title"
        >
          Фильтр
        </h2>

        <div className="catalog__filter">
          <div className="catalog__filter__block">
            <p
              className="catalog__filter__block__title"
            >
              Жанр
            </p>
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="combo-box-demo"
              options={sortedGenresList}
              size="small"
              value={selectedGeners}
              onChange={setSelectedGenersAction}
              className="catalog__filter__field"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    size="small"
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Жанр Аниме"
                  size="small"
                  className="catalog__filter__field"
                />
              )}
            />
          </div>

          <div className="catalog__filter__block">
            <p
              className="catalog__filter__block__title"
            >
              Тип
            </p>
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="combo-box-demo"
              options={typesList}
              size="small"
              value={selectedTypes}
              onChange={setSelectedTypesAction}
              className="catalog__filter__field"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    size="small"
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Тип Аниме"
                  size="small"
                  className="catalog__filter__field"
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* <p>{`${data.join(' ')}`}</p> */}
    </>
  );
};
