import {
  FC,
  useEffect,
  useState,
} from 'react';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getGenres } from '../../../api/animes';

export const AnimeCatalogFilter: FC = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    getGenres()
      .then((r) => setGenres([...new Set<string>(r)]))
      .catch((error) => {
        setGenres([...error]);
      });
  }, []);

  const setDataAction = (_: React.SyntheticEvent, value: string[]) => {
    setData(value);
  };

  return (
    <>
      <Autocomplete
        multiple
        disableCloseOnSelect
        id="combo-box-demo"
        options={genres}
        size="small"
        value={data}
        onChange={setDataAction}
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
            label="Movie"
            size="small"
            className="catalog__filter__field"
          />
        )}
      />

      {/* <p>{`${data.join(' ')}`}</p> */}
    </>
  );
};
