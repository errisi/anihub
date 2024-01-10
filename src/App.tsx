import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { AppHeader } from './components/appHeader/AppHeader';
import { AppFooter } from './components/appFooter/AppFooter';

export const App = () => (
  <div className="wrap">
    <header className="header">
      <AppHeader />
    </header>

    <main className="main">
      <Container>
        <Outlet />
      </Container>
    </main>

    <footer className="footer">
      <AppFooter />
    </footer>
  </div>
);
