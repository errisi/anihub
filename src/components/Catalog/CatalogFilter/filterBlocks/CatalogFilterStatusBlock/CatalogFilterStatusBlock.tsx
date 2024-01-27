import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

type Props = {
  statusList: string[];
  selectedStatus: string;
  handleStatusSelect: (event: SelectChangeEvent) => void;
};

export const CatalogFilterStatusBlock: FC<Props> = ({
  statusList,
  selectedStatus,
  handleStatusSelect,
}) => (
  <div className="catalog__filter__block-score">
    <FormControl
      fullWidth
      size="small"
    >
      <InputLabel id="demo-simple-select-label">
        Выберите статус
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedStatus}
        label="Выберите статус"
        onChange={handleStatusSelect}
      >
        <MenuItem value="">Не учитывать</MenuItem>

        {statusList.map(status => (
          <MenuItem
            key={status}
            value={status}
          >
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);
