import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { AppHeader } from './components/appHeader/AppHeader';

export const App = () => (
  <>
    <AppHeader />

    <Container className="mainContainer">
      <Outlet />
    </Container>
  </>
);
