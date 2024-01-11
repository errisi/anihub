import { FC, useState } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export const AnimeCatalogSort: FC = () => {
  const ordersList = ['Рейтингу', 'Популярности', 'Названию', 'Дате выхода'];
  const [selectedOrder, setSelectedOrder] = useState('Рейтингу');
  const handleOrderSelect = (event: SelectChangeEvent) => {
    setSelectedOrder(event.target.value as string);
  };

  return (
    <>
      <div className="catalog__header__block">
        <p
          className="catalog__header__block__title"
        >
          Сортировать по:
        </p>

        <div className="catalog__header__block-sort">
          <FormControl
            variant="standard"
            fullWidth
            size="small"
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOrder}
              label="Выберите статус"
              onChange={handleOrderSelect}
            >
              {ordersList.map(status => (
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
      </div>
    </>
  );
};
