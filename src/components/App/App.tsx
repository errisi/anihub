import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Container } from '@mui/material';
import { AppHeader } from '../Header/Header';
import { AppFooter } from '../Footer/Footer';
import styles from './App.module.scss';
import ScrollButton from './ScrollTopButton/ScrollTopButton';
import { useAppDispatch } from '../../store/hooks';
import * as BestSeasonOngoingsActions from '../../features/BestSeasonOngoings';
import * as NewReleasedActions from '../../features/NewReleased';
import * as ReleaseCalendarActions from '../../features/ReleaseCalendar';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(BestSeasonOngoingsActions.init());
    dispatch(NewReleasedActions.init());
    dispatch(ReleaseCalendarActions.init());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrap}>
      <AppHeader />

      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
        <ScrollButton />
      </main>

      <footer className={styles.footer}>
        <AppFooter />
      </footer>
    </div>
  );
};
