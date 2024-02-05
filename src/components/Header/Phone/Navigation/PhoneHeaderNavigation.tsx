import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import TvIcon from '@mui/icons-material/Tv';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import styles from './PhoneHeaderNavigation.module.scss';
import './links.scss';

export const PhoneHeaderNavigation = () => (
  <nav className={styles.nav}>
    <ul className="links">
      <li className={styles.nav__item}>
        <Button
          variant="text"
          component={NavLink}
          to="/"
          className={styles.nav__link}
        >
          <CottageOutlinedIcon color="primary" />
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
          <TvIcon />
          Каталог
        </Button>
      </li>

      <li className={styles.nav__item}>
        <Button
          variant="text"
          component={NavLink}
          to="/top"
          className={styles.nav__link}
        >
          <WhatshotOutlinedIcon />
          Подборки
        </Button>
      </li>
    </ul>
  </nav>
);
