import { FC } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/getSearchWith';
import { Params } from '../../../types/Params';

export const AnimeCatalogSort: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const ordersList = ['Рейтингу', 'Популярности', 'Названию', 'Дате выхода'];
  const selectedOrder = searchParams.get('order') || 'Рейтингу';

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleOrderSelect
  = (event: SelectChangeEvent) => {
    setSearchWith({ order: event.target.value as string });
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
