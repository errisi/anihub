import { FC } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Notifications } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AppHeaderLogo } from '../Logo/HeaderLogo';
import { AppHeaderHavigation } from '../Navigation/HeaderHavigation';
import { AppHeaderSearch } from '../Search/HeaderSearch';
import styles from './TabletHeader.module.scss';
import { User } from '../../../types/User';
import { Auth } from '../Auth/Auth';

type Props = {
  windowWidth: number;
  isSearchOpened: boolean;
  setIsSearchOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handleAuthMenuOpenAuth: () => void;
  user: User | null;
  isUserActionsActive: boolean;
  setIsUserActionsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSettingsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TabletHeader: FC<Props> = ({
  windowWidth,
  isSearchOpened,
  setIsSearchOpened,
  handleAuthMenuOpenAuth,
  user,
  isUserActionsActive,
  setIsUserActionsActive,
  setIsSettingsMenuOpened,
}) => (
  <div className="header">
    <div className={styles.header__wrapper}>
      <div className={styles.header__left_side}>
        <AppHeaderLogo />

        <AppHeaderHavigation />
      </div>
      {windowWidth >= 1100 && (
        <div className={styles.header__search}>
          <AppHeaderSearch />
        </div>
      )}

      {isSearchOpened && windowWidth < 1100 && (
        <div className={styles.header__search_s}>
          <AppHeaderSearch />
        </div>
      )}

      <div className={styles.header__right_side}>
        {windowWidth <= 1100 && (
          <IconButton onClick={() => setIsSearchOpened((c) => !c)}>
            <SearchIcon color="primary" />
          </IconButton>
        )}
        <IconButton component={Link} to="/">
          <Notifications color="primary" />
        </IconButton>

        {!user && (
          <IconButton onClick={() => handleAuthMenuOpenAuth()}>
            <AccountCircleTwoToneIcon color="primary" fontSize="large" />
          </IconButton>
        )}

        {user && (
          <Auth
            user={user}
            isUserActionsActive={isUserActionsActive}
            setIsUserActionsActive={setIsUserActionsActive}
            setIsSettingsMenuOpened={setIsSettingsMenuOpened}
          />
        )}
      </div>
    </div>
  </div>
);
