import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './HeaderHavigation.module.scss';

export const AppHeaderHavigation = () => (
  <nav className={styles.nav}>
    <ul className={styles.nav__list}>
      <li className={styles.nav__item}>
        <Button
          variant="text"
          component={NavLink}
          to="/"
          className={styles.nav__link}
        >
          Главная
        </Button>
      </li>

      <li className={styles.nav__item}>
        <Button
          variant="text"
          component={NavLink}
          to="/anime"
          className={styles.nav__link}
        >
          Каталог
        </Button>
      </li>

      {/* <li className={styles.nav__item}>
        <Button
          variant="text"
          component={NavLink}
          to="/top"
          className={styles.nav__link}
        >
          Подборки
        </Button>
      </li> */}
    </ul>
  </nav>
);
