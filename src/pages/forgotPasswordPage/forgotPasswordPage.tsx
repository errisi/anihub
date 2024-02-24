import { ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './forgotPasswordPage.module.scss';
import { authService } from '../../services/authService';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSucces, setIsSuccess] = useState(false);

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(e.target.value);
    setIsSuccess(false);
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

  const handleSendResetToken = async () => {
    authService.sendResetToken(email);
    setIsSuccess(true);
  };

  return (
    <div className={styles.content}>
      <div className={styles.content__block}>
        <h3>Введите email аккаунта</h3>
        <TextField
          fullWidth
          id="outlined-email-input"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          error={!!emailError}
          helperText={emailError}
        />
        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={handleSendResetToken}
          disabled={!email || !!emailError || isSucces}
        >
          Сбросить пароль
        </Button>
        {isSucces && (
          <p className={styles.content__text}>
            Ссылка для сброса пароля была отправленна на указанную почту.
          </p>
        )}
      </div>
    </div>
  );
};
