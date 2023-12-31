import { Link } from 'react-router-dom';

export const AppHeaderLogo = () => (
  <Link to="/">
    <img
      src="../../../public/images/logo.svg"
      alt="logo"
      className="header__logo"
    />
  </Link>
);
