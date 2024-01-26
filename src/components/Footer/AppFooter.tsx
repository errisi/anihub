import { Container } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const AppFooter: FC = () => (
  <Container>
    <div className="footer__wrapper">
      <div className="footer__links">
        <Link
          to="/"
          className="footer__links__item"
        >
          Контакты
        </Link>
        <Link
          to="/"
          className="footer__links__item"
        >
          Соглашение
        </Link>
        <Link
          to="/"
          className="footer__links__item"
        >
          Конфиденциальность
        </Link>
        <Link
          to="/"
          className="footer__links__item"
        >
          Правообладателям
        </Link>
      </div>

      <div className="footer__copyright">
        <p>
          {`© anihub.icu ${new Date().getFullYear()}`}
        </p>
      </div>
    </div>
  </Container>
);
