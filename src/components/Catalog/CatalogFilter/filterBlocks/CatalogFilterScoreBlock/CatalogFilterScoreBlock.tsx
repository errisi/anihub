import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

type Props = {
  scoreList: string[];
  selectedScore: string;
  handleScoreSelect: (event: SelectChangeEvent) => void;
};

export const CatalogFilterScoreBlock: FC<Props> = ({
  scoreList,
  selectedScore,
  handleScoreSelect,
}) => (
  <div className="catalog__filter__block-score">
    <FormControl
      fullWidth
      size="small"
    >
      <InputLabel id="demo-simple-select-label">
        Выберите рейтинг
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedScore}
        label="Выберите рейтинг"
        onChange={handleScoreSelect}
      >
        <MenuItem value="">Не учитывать</MenuItem>

        {scoreList.map(status => (
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
