import { FC } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Notifications } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { AppHeaderLogo } from '../Logo/HeaderLogo';
import { AppHeaderHavigation } from '../Navigation/HeaderHavigation';
import { AppHeaderSearch } from '../Search/HeaderSearch';
import styles from './TabletHeader.module.scss';

type Props = {
  windowWidth: number;
};

export const TabletHeader: FC<Props> = ({ windowWidth }) => (
  <div className="header">
    <div className={styles.header__wrapper}>
      <div className={styles.header__left_side}>
        <AppHeaderLogo />

        <AppHeaderHavigation />
      </div>
      <div className={styles.header__search}>
        <AppHeaderSearch />
      </div>

      <div className={styles.header__right_side}>
        {windowWidth >= 840 && (
          <Button variant="text" component={Link} to="/">
            <Notifications color="primary" />
          </Button>
        )}
        <IconButton>
          <AccountCircleTwoToneIcon color="primary" fontSize="large" />
        </IconButton>
      </div>
    </div>
  </div>
);
