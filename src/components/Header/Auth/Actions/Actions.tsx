import { FC } from 'react';
import { Button } from '@mui/material';
import styles from './Actions.module.scss';
import { useAppDispatch } from '../../../../store/hooks';
import * as UserDispatchActions from '../../../../features/User';

type Props = {
  setIsSettingsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserActions: FC<Props> = ({ setIsSettingsMenuOpened }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(UserDispatchActions.logout());
  };

  return (
    <div className={styles.actions}>
      {/* <Button>Профиль</Button>
      <Button>Понравившиеся</Button> */}
      <Button onClick={() => setIsSettingsMenuOpened((c) => !c)}>
        Настройки
      </Button>
      <Button onClick={handleLogout}>Выйти</Button>
    </div>
  );
};
