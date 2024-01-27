import { Link } from 'react-router-dom';
import styles from './HeaderLogo.module.scss';

export const AppHeaderLogo = () => (
  <Link to="/">
    <img
      src="../../../public/images/logo.svg"
      alt="logo"
      className={styles.logo}
    />
  </Link>
);
