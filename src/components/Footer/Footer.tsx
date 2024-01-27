import { Container } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const AppFooter: FC = () => (
  <Container>
    <div className={styles.footer__wrapper}>
      <div className={styles.footer__links}>
        <Link
          to="/"
          className={styles.footer__links__item}
        >
          Контакты
        </Link>
        <Link
          to="/"
          className={styles.footer__links__item}
        >
          Соглашение
        </Link>
        <Link
          to="/"
          className={styles.footer__links__item}
        >
          Конфиденциальность
        </Link>
        <Link
          to="/"
          className={styles.footer__links__item}
        >
          Правообладателям
        </Link>
      </div>

      <div className={styles.footer__copyright}>
        <p>
          {`© anihub.icu ${new Date().getFullYear()}`}
        </p>
      </div>
    </div>
  </Container>
);
