import { FC } from 'react';
import { Button, Collapse, FormControl } from '@mui/material';
import styles from './Auth.module.scss';
import { User } from '../../../types/User';
import { UserActions } from './Actions/Actions';

type Props = {
  user: User;
  isUserActionsActive: boolean;
  setIsUserActionsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSettingsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Auth: FC<Props> = ({
  user,
  isUserActionsActive,
  setIsUserActionsActive,
  setIsSettingsMenuOpened,
}) => {
  return (
    <FormControl
      className={styles.header__user}
      onBlur={() => setIsUserActionsActive(false)}
    >
      <Button
        className={styles.header__user__block}
        sx={{ textTransform: 'none' }}
        onClick={() => setIsUserActionsActive((c) => !c)}
        fullWidth
      >
        <img
          src={user.avatar}
          className={styles.header__user__block__avatar}
          alt="avatar"
        />
        <p className={styles.header__user__block__title}>
          {user.name}
        </p>
      </Button>

      <Collapse
        in={isUserActionsActive}
        onBlur={() => setIsUserActionsActive((c) => !c)}
      >
        <UserActions setIsSettingsMenuOpened={setIsSettingsMenuOpened} />
      </Collapse>
    </FormControl>
  );
};
