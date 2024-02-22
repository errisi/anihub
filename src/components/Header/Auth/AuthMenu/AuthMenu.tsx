import { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
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
  const [emailDitry, setEmailDitry] = useState(false);
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordDitry, setPasswordDitry] = useState(false);
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым',
  );
  const [loginDitry, setLoginDitry] = useState(false);
  const [loginError, setLoginError] = useState('Логин не может быть пустым');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const re = new RegExp(
      // eslint-disable-next-line @typescript-eslint/quotes
      `^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$`,
      'i',
    );

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный Email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(e.target.value);

    if (e.target.value.length < 8) {
      setPasswordError('Пароль должен быть длиннее 8 символов');
    } else {
      setPasswordError('');
    }
  };

  const handleLoginChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLogin(e.target.value);
    const re = new RegExp(
      '^[a-zA-Z0-9](_(?!(\\.|_))|\\.(?!(_|\\.))|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$',
    );

    if (!re.test(String(e.target.value).toLowerCase())) {
      setLoginError(
        e.target.value.length > 4
          ? 'Логин содержит запрещенные символы'
          : 'Логин слишком короткий',
      );
    } else {
      setLoginError('');
    }
  };

  const handleOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    switch (e.target.name) {
      case 'email':
        setEmailDitry(true);
        break;

      case 'password':
        setPasswordDitry(true);
        break;

      case 'login':
        setLoginDitry(true);
        break;

      default:
        break;
    }
  };

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
                name="email"
                onBlur={(e) => handleOnBlur(e)}
                onChange={handleEmailChange}
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
                  name="password"
                  onBlur={(e) => handleOnBlur(e)}
                  onChange={(e) => handlePasswordChange(e)}
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
              <Button
                variant="contained"
                onClick={handleAuth}
                disabled={!!emailError || !!passwordError}
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
                name="login"
                autoComplete="username"
                value={login}
                onBlur={(e) => handleOnBlur(e)}
                error={!!(loginDitry && loginError)}
                helperText={loginDitry ? loginError : ''}
                onChange={(e) => handleLoginChange(e)}
              />
              <TextField
                id="outlined-email-input"
                required
                label="Введите email"
                type="email"
                autoComplete="current-email"
                value={email}
                name="email"
                onBlur={(e) => handleOnBlur(e)}
                onChange={handleEmailChange}
                error={!!(emailDitry && emailError)}
                helperText={emailDitry ? emailError : ''}
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Введите пароль
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onBlur={(e) => handleOnBlur(e)}
                  label="Введите пароль"
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                  error={!!(passwordDitry && passwordError)}
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
                {!!passwordDitry && (
                  <FormHelperText error id="username-error">
                    {passwordError}
                  </FormHelperText>
                )}
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
                disabled={!!emailError || !!passwordError || !!loginError}
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
