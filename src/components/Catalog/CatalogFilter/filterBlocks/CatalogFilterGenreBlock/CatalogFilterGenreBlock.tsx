import { FC, useMemo } from 'react';
import {
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styles from './CatalogFilterGenreBlock.module.scss';

type Props = {
  genresList: string[];
  selectedGeners: string[];
  handleGenersSelect: (_: React.SyntheticEvent, value: string[]) => void;
};

export const CatalogFilterGenreBlock: FC<Props> = ({
  genresList,
  selectedGeners,
  handleGenersSelect,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const sortedGenresList = useMemo(() => {
    return genresList.sort((a, b) => a.localeCompare(b));
  }, [genresList]);

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      id="combo-box-demo"
      options={sortedGenresList}
      size="small"
      value={selectedGeners}
      onChange={handleGenersSelect}
      className={styles.catalog__filter__field}
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
          className={styles.catalog__filter__field}
        />
      )}
      sx={{ display: 'block' }}
    />
  );
};
