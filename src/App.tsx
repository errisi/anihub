import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { AppHeader } from './components/appHeader/AppHeader';
import { useAppDispatch } from './store/hooks';
import * as animesActions from './features/anime';
import { AppFooter } from './components/appFooter/AppFooter';

export const App = () => {
  /* eslint-disable */
  const dispatch = useAppDispatch();
  // const { animes, loading, error } = useAppSelector(state => state.anime);

  useEffect(() => {
    dispatch(animesActions.init());
  }, []);

  return (
    <>
    <header className="header">
      <AppHeader />
    </header>

      <main className='main'>
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className='footer'>
        <AppFooter />
      </footer>
    </>
  );
};
