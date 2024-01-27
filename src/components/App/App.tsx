import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { AppHeader } from '../Header/Header';
import { AppFooter } from '../Footer/Footer';
import styles from './App.module.scss';
import ScrollButton from './ScrollTopButton/ScrollTopButton';

export const App = () => (
  <div className={styles.wrap}>
    <header className={styles.header}>
      <AppHeader />
    </header>

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
