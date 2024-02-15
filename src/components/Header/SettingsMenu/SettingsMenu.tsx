import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import axios from 'axios';
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
import styles from './SettingsMenu.module.scss';
import { User } from '../../../types/User';
import { useAppDispatch } from '../../../store/hooks';
import * as UserActions from '../../../features/User';

type Props = {
  setIsSettingsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};

export const SettingsMenu: FC<Props> = ({ setIsSettingsMenuOpened, user }) => {
  const [login, setLogin] = useState(`${user.name}`);
  const [email, setEmail] = useState(`${user.email}`);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState(`${user.avatar}`);

  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSettingsAply = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData();

    if (avatar) {
      formData.append('file', avatar);

      await axios.patch(
        `http://localhost:3005/users/${user.id}/update-avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    }

    await axios.patch(`http://localhost:3005/users/${user.id}/`, {
      name: login !== user.name ? login : '',
      email: email !== user.email ? email : '',
      password,
    });

    await dispatch(UserActions.checkAuth());

    setIsSettingsMenuOpened(false);
  };

  const handleSettingsCancel = () => {
    setLogin(`${user.name}`);
    setEmail(`${user.email}`);
    setPassword('');
  };

  const fileReader = new FileReader();

  fileReader.onloadend = () => {
    setAvatarURL(fileReader.result as string);
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const image = e.target.files ? e.target.files[0] : null;

    if (image) {
      setAvatar(image);
      fileReader.readAsDataURL(image);
    }
  };

  return (
    <>
      <div
        role="button"
        aria-label="asd"
        tabIndex={0}
        className={styles.settings__under}
        onClick={() => setIsSettingsMenuOpened(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsSettingsMenuOpened(false);
          }
        }}
      />
      <div className={styles.settings}>
        <IconButton
          onClick={() => setIsSettingsMenuOpened((c) => !c)}
          className={styles.settings__close}
        >
          <CloseIcon color="primary" />
        </IconButton>

        <form
          className={styles.settings__form}
          onSubmit={(e) => handleSettingsAply(e)}
        >
          <h2 className={styles.settings__title}>Настройки</h2>
          <img
            src={avatarURL}
            alt="avatar"
            className={styles.settings__avatar}
          />
          <Button variant="text" component="label">
            Загрузить
            <input type="file" hidden onChange={handleAvatarChange} />
          </Button>
          <div className={styles.settings__content}>
            <TextField
              id="outlined-login-input"
              label="Логин"
              autoComplete="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Новый пароль
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                required
                type={showPassword ? 'text' : 'password'}
                label="Новый пароль"
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
            className={styles.settings__content__buttons}
            size="medium"
          >
            <Button variant="outlined" onClick={handleSettingsCancel}>
              Сбросить
            </Button>
            <Button
              variant="contained"
              onClick={handleSettingsAply}
              type="submit"
            >
              Применить
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </>
  );
};
