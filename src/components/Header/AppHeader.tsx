import { Button, ButtonGroup, Container } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AppHeaderHavigation } from './Navigation/AppHeaderHavigation';
import { AppHeaderSearch } from './Search/AppHeaderSearch';
import { AppHeaderLogo } from './Logo/AppHeaderLogo';

export const AppHeader = () => (
  <>
    <Container>
      <div className="header__wrapper">
        <div className="header__left-side">
          <AppHeaderLogo />

          <AppHeaderHavigation />

          <AppHeaderSearch />
        </div>

        <div className="header__right-side">
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
