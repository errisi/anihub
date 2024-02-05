import { useEffect, useState } from 'react';
import { Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import NotificationsOutlinedIcon
  from '@mui/icons-material/NotificationsOutlined';
import { AppHeaderLogo } from '../Logo/HeaderLogo';
import styles from './PhoneHeader.module.scss';
import { PhoneHeaderNavigation } from './Navigation/PhoneHeaderNavigation';

export const PhoneHeader = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(true);

  useEffect(() => {
    if (isMenuOpened) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isMenuOpened]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__wrapper}>
          <div className={styles.header__left_side}>
            <IconButton onClick={() => setIsMenuOpened((c) => !c)}>
              {isMenuOpened ? (
                <CloseIcon color="primary" />
              ) : (
                <MenuTwoToneIcon color="primary" />
              )}
            </IconButton>
            <AppHeaderLogo />
          </div>

          <div className={styles.header__right_side}>
            <IconButton>
              <SearchIcon color="primary" />
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon color="primary" />
            </IconButton>
            <IconButton>
              <AccountCircleTwoToneIcon color="primary" />
            </IconButton>
          </div>
        </div>
      </div>

      <Collapse
        orientation="horizontal"
        className={styles.menu}
        in={isMenuOpened}
      >
        <PhoneHeaderNavigation />
      </Collapse>
      {isMenuOpened && (
        <button
          type="button"
          aria-label="s"
          className={styles.menu__under}
          onClick={() => setIsMenuOpened((c) => !c)}
        >
          <div className={styles.menu__under} />
        </button>
      )}
    </>
  );
};
