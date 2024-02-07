import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/getSearchWith';
import { Params } from '../../../types/Params';
import styles from './CatalogSort.module.scss';

type Props = {
  windowWidth: number;
};

export const CatalogSort: FC<Props> = ({ windowWidth }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const ordersList = ['Рейтингу', 'Популярности', 'Названию', 'Дате выхода'];
  const selectedOrder = searchParams.get('order') || 'Рейтингу';

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const handleOrderSelect = (event: SelectChangeEvent) => {
    setSearchWith({ order: event.target.value as string });
  };

  return (
    <>
      <div className={styles.catalog__header__block}>
        <p className={styles.catalog__header__block__title}>Сортировать по:</p>

        <div className={styles.catalog__header__block_sort}>
          <FormControl fullWidth size="small">
            {windowWidth < 1200 && (
              <InputLabel id="demo-simple-select-label">
                Сортировать по
              </InputLabel>
            )}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOrder}
              label={windowWidth < 1200 ? 'Сортировать по' : ''}
              onChange={handleOrderSelect}
              variant={windowWidth < 1200 ? 'outlined' : 'standard'}
            >
              {ordersList.map((status) => (
                <MenuItem key={status} value={status}>
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
