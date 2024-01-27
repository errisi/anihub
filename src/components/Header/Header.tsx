import { Button, ButtonGroup, Container } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AppHeaderHavigation } from './Navigation/HeaderHavigation';
import { AppHeaderSearch } from './Search/HeaderSearch';
import { AppHeaderLogo } from './Logo/HeaderLogo';
import styles from './Header.module.scss';

export const AppHeader = () => (
  <>
    <Container>
      <div className={styles.header__wrapper}>
        <div className={styles.header__left_side}>
          <AppHeaderLogo />

          <AppHeaderHavigation />

          <AppHeaderSearch />
        </div>

        <div className={styles.header__right_side}>
          <Button variant="text" component={Link} to="/">
            <Notifications color="primary" />
          </Button>

          <ButtonGroup>
            <Button variant="outlined" component={Link} to="/">
              Войти
            </Button>

            <Button variant="contained" component={Link} to="/">
              Регистрация
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Container>
  </>
);
