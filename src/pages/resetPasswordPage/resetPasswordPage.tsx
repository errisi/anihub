import { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import styles from './resetPasswordPage.module.scss';
import { authService } from '../../services/authService';

export const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSucces, setIsSuccess] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(e.target.value);
    setIsSuccess(false);

    if (e.target.value.length && e.target.value.length < 8) {
      setPasswordError('Пароль должен быть длиннее 8 символов');
    } else {
      setPasswordError('');
    }
  };

  const handleResetPassword = () => {
    if (resetToken) {
      authService.resetPassword(resetToken, password);
      setIsSuccess(true);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.content__block}>
        <h3>Установите новый пароль</h3>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Новый пароль
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            label="Новый пароль"
            value={password}
            autoComplete="off"
            onChange={(e) => handlePasswordChange(e)}
            error={!!passwordError}
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
          {!!passwordError && (
            <FormHelperText error id="password-error">
              {passwordError}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={handleResetPassword}
          disabled={!password || !!passwordError || isSucces}
        >
          Установить пароль
        </Button>
        {isSucces && (
          <p className={styles.content__text}>Пароль успешно изменен.</p>
        )}
      </div>
    </div>
  );
};
