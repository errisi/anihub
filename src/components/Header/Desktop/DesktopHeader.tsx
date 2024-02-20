import { FC } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  IconButton,
} from '@mui/material';
import { Notifications } from '@mui/icons-material';
import styles from './DesktopHeader.module.scss';
import { AppHeaderLogo } from '../Logo/HeaderLogo';
import { AppHeaderHavigation } from '../Navigation/HeaderHavigation';
import { AppHeaderSearch } from '../Search/HeaderSearch';
import { User } from '../../../types/User';
import { Auth } from '../Auth/Auth';
import { HeaderNotifications } from '../Notifications/Notifications';
import { Notification } from '../../../types/Notification';

type Props = {
  handleAuthMenuOpenAuth: () => void;
  handleAuthMenuOpenRegister: () => void;
  user: User | null;
  isUserActionsActive: boolean;
  setIsUserActionsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSettingsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isNotificationsMenuOpened: boolean;
  setIsNotificationsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: Notification[];
};

export const DesktopHeader: FC<Props> = ({
  handleAuthMenuOpenAuth,
  handleAuthMenuOpenRegister,
  user,
  isUserActionsActive,
  setIsUserActionsActive,
  setIsSettingsMenuOpened,
  isNotificationsMenuOpened,
  setIsNotificationsMenuOpened,
  notifications,
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
        <IconButton onClick={() => setIsNotificationsMenuOpened((c) => !c)}>
          <Badge
            badgeContent={
              notifications.filter((n) => n.status === 'not viewed').length
            }
            color="primary"
          >
            <Notifications color="primary" />
          </Badge>
        </IconButton>

        {!!user && isNotificationsMenuOpened && (
          <HeaderNotifications
            setIsNotificationsMenuOpened={setIsNotificationsMenuOpened}
          />
        )}

        {!user && (
          <ButtonGroup>
            <Button variant="outlined" onClick={handleAuthMenuOpenAuth}>
              Войти
            </Button>

            <Button variant="contained" onClick={handleAuthMenuOpenRegister}>
              Регистрация
            </Button>
          </ButtonGroup>
        )}
        {user && (
          <>
            {user && (
              <Auth
                user={user}
                isUserActionsActive={isUserActionsActive}
                setIsUserActionsActive={setIsUserActionsActive}
                setIsSettingsMenuOpened={setIsSettingsMenuOpened}
              />
            )}
          </>
        )}
      </div>
    </div>
  </Container>
);
