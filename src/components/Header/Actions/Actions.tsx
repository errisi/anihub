import { Button } from '@mui/material';
import styles from './Actions.module.scss';
import { useAppDispatch } from '../../../store/hooks';
import * as UserDispatchActions from '../../../features/User';

export const UserActions = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(UserDispatchActions.logout());
  };

  return (
    <div className={styles.actions}>
      <Button>Профиль</Button>
      <Button>Понравившиеся</Button>
      <Button>Настройки</Button>
      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
};
