import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const AppHeaderHavigation = () => (
  <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <Button variant="text" component={NavLink} to="/" className="nav__link">
          Главная
        </Button>
      </li>

      <li className="nav__item">
        <Button
          variant="text"
          component={NavLink}
          to="/anime"
          className="nav__link"
        >
          Каталог
        </Button>
      </li>

      <li className="nav__item">
        <Button
          variant="text"
          component={NavLink}
          to="/top"
          className="nav__link"
        >
          Топ
        </Button>
      </li>
    </ul>
  </nav>
);
