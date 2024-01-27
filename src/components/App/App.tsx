import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { AppHeader } from '../Header/Header';
import { AppFooter } from '../Footer/Footer';
import styles from './App.module.scss';

export const App = () => (
  <div className="wrap">
    <header className={styles.header}>
      <AppHeader />
    </header>

    <main className={styles.main}>
      <Container>
        <Outlet />
      </Container>
    </main>

    <footer className={styles.footer}>
      <AppFooter />
    </footer>
  </div>
);