import React, { FormEvent, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { DesktopHeader } from './Desktop/DesktopHeader';
import { TabletHeader } from './Tablet/TabletHeader';
import { PhoneHeader } from './Phone/PhoneHeader';
import styles from './Header.module.scss';
import { register } from '../../api/server';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as UserActions from '../../features/User';

export const AppHeader = () => {
  const dispatch = useAppDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthMenuOpened, setIsAuthMenuOpened] = useState(false);
  const [currentAuthMenuType, setCurrentAuthMenuType]
    = useState<'auth' | 'register'>('auth');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthMenuOpenAuth = () => {
    setIsAuthMenuOpened(true);
    setCurrentAuthMenuType('auth');
  };

  const handleAuthMenuOpenRegister = () => {
    setIsAuthMenuOpened(true);
    setCurrentAuthMenuType('register');
  };

  const handleRegister = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await register(login, email, password);
  };

  const {
    user,
    // loading,
    // error,
  } = useAppSelector((state) => state.User);

  const handleAuth = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    dispatch(UserActions.init({ email, password }));

    // eslint-disable-next-line no-console
    console.log(user);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header
        className={styles.header}
        style={{ marginBottom: isSearchOpened ? '58px' : '24px' }}
      >
        {windowWidth >= 1300 && (
          <DesktopHeader
            handleAuthMenuOpenAuth={handleAuthMenuOpenAuth}
            handleAuthMenuOpenRegister={handleAuthMenuOpenRegister}
            user={user}
          />
        )}
        {windowWidth < 1300 && windowWidth >= 640 && (
          <TabletHeader
            windowWidth={windowWidth}
            isSearchOpened={isSearchOpened}
            setIsSearchOpened={setIsSearchOpened}
          />
        )}
        {windowWidth < 640 && (
          <PhoneHeader
            isSearchOpened={isSearchOpened}
            setIsSearchOpened={setIsSearchOpened}
          />
        )}

        {isAuthMenuOpened && (
          <>
            <div
              role="button"
              aria-label="asd"
              tabIndex={0}
              className={styles.header__auth__under}
              onClick={() => setIsAuthMenuOpened(false)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setIsAuthMenuOpened(false);
                }
              }}
            />
            <div className={styles.header__auth}>
              <IconButton
                onClick={() => setIsAuthMenuOpened((c) => !c)}
                className={styles.header__auth__close}
              >
                <CloseIcon color="primary" />
              </IconButton>
              {currentAuthMenuType === 'auth' && (
                <form
                  className={styles.header__auth__form}
                  onSubmit={(e) => handleAuth(e)}
                >
                  <h2 className={styles.header__auth__title}>Авторизация</h2>
                  <div className={styles.header__auth__content}>
                    <TextField
                      required
                      id="outlined-email-input"
                      label="Введите email"
                      type="email"
                      autoComplete="current-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Введите пароль
                      </InputLabel>
                      <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )}
                        label="Введите пароль"
                      />
                    </FormControl>
                  </div>
                  <Link to="/" className="forgot">
                    <p>Забыли пароль?</p>
                  </Link>

                  <ButtonGroup
                    fullWidth
                    className={styles.header__auth__content__buttons}
                    size="medium"
                  >
                    <Button
                      variant="outlined"
                      onClick={handleAuthMenuOpenRegister}
                    >
                      Регистрация
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleAuth}
                    >
                      Войти
                    </Button>
                  </ButtonGroup>
                </form>
              )}

              {currentAuthMenuType === 'register' && (
                <form
                  className={styles.header__auth__form}
                  onSubmit={(e) => handleRegister(e)}
                >
                  <h2 className={styles.header__auth__title}>Регистрация</h2>
                  <div className={styles.header__auth__content}>
                    <TextField
                      id="outlined-login-input"
                      required
                      label="Введите логин"
                      autoComplete="username"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                    <TextField
                      id="outlined-email-input"
                      required
                      label="Введите email"
                      type="email"
                      autoComplete="current-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Введите пароль
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        required
                        type={showPassword ? 'text' : 'password'}
                        label="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )}
                      />
                    </FormControl>
                  </div>

                  <ButtonGroup
                    fullWidth
                    className={styles.header__auth__content__buttons}
                    size="medium"
                  >
                    <Button variant="outlined" onClick={handleAuthMenuOpenAuth}>
                      Войти
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleRegister}
                      type="submit"
                    >
                      Регистрация
                    </Button>
                  </ButtonGroup>
                </form>
              )}
            </div>
          </>
        )}
      </header>
    </>
  );
};
