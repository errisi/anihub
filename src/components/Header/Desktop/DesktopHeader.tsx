import { FC } from 'react';
import { Button, ButtonGroup, Container } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styles from './DesktopHeader.module.scss';
import { AppHeaderLogo } from '../Logo/HeaderLogo';
import { AppHeaderHavigation } from '../Navigation/HeaderHavigation';
import { AppHeaderSearch } from '../Search/HeaderSearch';

type Props = {
  handleAuthMenuOpenAuth: () => void;
  handleAuthMenuOpenRegister: () => void;
};

export const DesktopHeader: FC<Props> = ({
  handleAuthMenuOpenAuth,
  handleAuthMenuOpenRegister,
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

        <ButtonGroup>
          <Button variant="outlined" onClick={handleAuthMenuOpenAuth}>
            Войти
          </Button>

          <Button variant="contained" onClick={handleAuthMenuOpenRegister}>
            Регистрация
          </Button>
        </ButtonGroup>
      </div>
    </div>
  </Container>
);
