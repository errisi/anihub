import { FC } from 'react';
import { Button } from '@mui/material';
import styles from './Actions.module.scss';

export const UserActions: FC = () => (
  <div className={styles.actions}>
    <Button>Профиль</Button>
    <Button>Понравившиеся</Button>
    <Button>Настройки</Button>
    <Button>Выйти</Button>
  </div>
);
