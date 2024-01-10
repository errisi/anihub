import { FC } from 'react';
import {
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type Props = {
  typesList: string[];
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
};

export const AnimeCatalogFilterTypeBlock: FC<Props> = ({
  typesList,
  selectedTypes,
  setSelectedTypes,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleTypesSelect
  = (_: React.SyntheticEvent, value: string[]) => {
    setSelectedTypes(value);
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      id="combo-box-demo"
      options={typesList}
      size="small"
      value={selectedTypes}
      onChange={handleTypesSelect}
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
          label="Выберите тип"
          size="small"
          className="catalog__filter__field"
        />
      )}
    />
  );
};
