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
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>
};

export const AnimeCatalogFilterStatusBlock: FC<Props> = ({
  statusList,
  selectedStatus,
  setSelectedStatus,
}) => {
  const handleStatusSelect = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string);
  };

  return (
    <>
      <div className="catalog__filter__block">
        <p
          className="catalog__filter__block__title"
        >
          Cтатус
        </p>

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
                <MenuItem value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
};
