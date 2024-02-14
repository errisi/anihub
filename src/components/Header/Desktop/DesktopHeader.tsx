import { FC } from 'react';
import {
  Button, ButtonGroup, Container, FormControl,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styles from './DesktopHeader.module.scss';
import { AppHeaderLogo } from '../Logo/HeaderLogo';
import { AppHeaderHavigation } from '../Navigation/HeaderHavigation';
import { AppHeaderSearch } from '../Search/HeaderSearch';
import { User } from '../../../types/User';
import { UserActions } from '../Actions/Actions';

type Props = {
  handleAuthMenuOpenAuth: () => void;
  handleAuthMenuOpenRegister: () => void;
  user: User;
  isUserActionsActive: boolean;
  setIsUserActionsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DesktopHeader: FC<Props> = ({
  handleAuthMenuOpenAuth,
  handleAuthMenuOpenRegister,
  user,
  isUserActionsActive,
  setIsUserActionsActive,
}) => (
  <Container>
    <div className={styles.header__wrapper}>
      <div className={styles.header__left_side}>
        <AppHeaderLogo />

        <AppHeaderHavigation />

        <div className={styles.header__search}>
          <AppHeaderSearch />
        </div>
      </div>

      <div className={styles.header__right_side}>
        <Button variant="text" component={Link} to="/">
          <Notifications color="primary" />
        </Button>

        {!user.user.name && (
          <ButtonGroup>
            <Button variant="outlined" onClick={handleAuthMenuOpenAuth}>
              Войти
            </Button>

            <Button variant="contained" onClick={handleAuthMenuOpenRegister}>
              Регистрация
            </Button>
          </ButtonGroup>
        )}
        {user.user.name && (
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
                src={user.user.avatar}
                className={styles.header__user__block__avatar}
                alt="avatar"
              />
              <p>{user.user.name}</p>
            </Button>

            <Collapse
              in={isUserActionsActive}
              onBlur={() => setIsUserActionsActive((c) => !c)}
            >
              <UserActions />
            </Collapse>
          </FormControl>
        )}
      </div>
    </div>
  </Container>
);
