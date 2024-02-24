import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, Container, Snackbar } from '@mui/material';
import { AppHeader } from '../Header/Header';
import { AppFooter } from '../Footer/Footer';
import styles from './App.module.scss';
import ScrollButton from './ScrollTopButton/ScrollTopButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as BestSeasonOngoingsActions from '../../features/BestSeasonOngoings';
import * as NewReleasedActions from '../../features/NewReleased';
import * as ReleaseCalendarActions from '../../features/ReleaseCalendar';
import * as UserActions from '../../features/User';

export const App = () => {
  const dispatch = useAppDispatch();

  const [isActovationSnackbarOpen, setIsActovationSnackbarOpen]
    = useState(false);

  const { user } = useAppSelector((state) => state.User);

  useEffect(() => {
    dispatch(BestSeasonOngoingsActions.init());
    dispatch(NewReleasedActions.init());
    dispatch(ReleaseCalendarActions.init());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      dispatch(UserActions.checkAuth());
    }

    if (user && user.activationToken) {
      setIsActovationSnackbarOpen(true);
    }
  }, [user, dispatch]);

  return (
    <div className={styles.wrap}>
      <AppHeader />

      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
        <ScrollButton />

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={isActovationSnackbarOpen}
          onClose={() => setIsActovationSnackbarOpen(false)}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            Ваш Email до сих пор не активирован
          </Alert>
        </Snackbar>
      </main>

      <footer className={styles.footer}>
        <AppFooter />
      </footer>
    </div>
  );
};
