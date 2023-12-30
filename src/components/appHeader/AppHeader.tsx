import { Container } from '@mui/material';
import { AppHeaderHavigation } from './Navigation/AppHeaderHavigation';
import { AppHeaderSearch } from './Search/AppHeaderSearch';

export const AppHeader = () => (
  <>
    <div className="header">
      <Container>
        <div className="header__left-side">
          <div className="header__wrapper">
            <AppHeaderHavigation />

            <AppHeaderSearch />
          </div>
        </div>
      </Container>
    </div>
  </>
);
