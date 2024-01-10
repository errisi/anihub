import { FC } from 'react';
import {
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type Props = {
  raitingsList: string[];
  selectedRaitings: string[];
  setSelectedRaitings: React.Dispatch<React.SetStateAction<string[]>>;
};

export const AnimeCatalogFilterRatingBlock: FC<Props> = ({
  raitingsList,
  selectedRaitings,
  setSelectedRaitings,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleRaitingsSelect
    = (_: React.SyntheticEvent, value: string[]) => {
      setSelectedRaitings(value);
    };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      id="combo-box-demo"
      options={raitingsList}
      size="small"
      value={selectedRaitings}
      onChange={handleRaitingsSelect}
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
          label="Выберите ограничение"
          size="small"
          className="catalog__filter__field"
        />
      )}
    />
  );
};
