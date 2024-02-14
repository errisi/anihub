import { FC, FormEvent } from 'react';
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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AuthMenu.module.scss';

type Props = {
  setIsAuthMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  currentAuthMenuType: 'auth' | 'register';
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  handleAuthMenuOpenAuth: () => void;
  handleAuthMenuOpenRegister: () => void;
  handleAuth: (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => Promise<void>;
  handleRegister: (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => Promise<void>;
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AuthMenu: FC<Props> = ({
  setIsAuthMenuOpened,
  currentAuthMenuType,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  handleAuthMenuOpenAuth,
  handleAuthMenuOpenRegister,
  handleAuth,
  handleRegister,
  login,
  setLogin,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
              <Button variant="outlined" onClick={handleAuthMenuOpenRegister}>
                Регистрация
              </Button>
              <Button variant="contained" onClick={handleAuth}>
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
  );
};
