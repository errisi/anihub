import { FC } from 'react';
import {
  Button, ButtonGroup, Collapse, Container,
} from '@mui/material';
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
  userActionsActive: boolean;
  setUserActionsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DesktopHeader: FC<Props> = ({
  handleAuthMenuOpenAuth,
  handleAuthMenuOpenRegister,
  user,
  userActionsActive,
  setUserActionsActive,
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
          <div>
            <Button
              className={styles.header__user}
              sx={{ textTransform: 'none' }}
              onClick={() => setUserActionsActive((c) => !c)}
            >
              <img
                src={user.user.avatar}
                className={styles.header__user__avatar}
                alt="avatar"
              />
              <p>{user.user.name}</p>
            </Button>

            <Collapse in={userActionsActive}>
              <UserActions />
            </Collapse>
          </div>
        )}
      </div>
    </div>
  </Container>
);
