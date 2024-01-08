import { FC, useMemo } from 'react';
import {
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type Props = {
  genresList: string[];
  selectedGeners: string[];
  setSelectedGeners: React.Dispatch<React.SetStateAction<string[]>>;
};

export const AnimeCatalogFilterGenreBlock: FC<Props> = ({
  genresList,
  selectedGeners,
  setSelectedGeners,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const sortedGenresList = useMemo(() => {
    return genresList.sort((a, b) => a.localeCompare(b));
  }, [genresList]);

  const handleGenersSelect
    = (_: React.SyntheticEvent, value: string[]) => {
      setSelectedGeners(value);
    };

  return (
    <>
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
          onChange={handleGenersSelect}
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
              label="Выберите жанр"
              size="small"
              className="catalog__filter__field"
            />
          )}
          sx={{ display: 'block' }}
        />
      </div>
    </>
  );
};
