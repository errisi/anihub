import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import styles from './accountActivationPage.module.scss';
import { authService } from '../../services/authService';

export const AccountActivationPage = () => {
  const { activationToken } = useParams();
  const [isAccountActive, setIsAccountActive] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activationToken) {
      setIsLoading(true);
      authService.activate(activationToken)
        .then(() => setIsAccountActive(true))
        .catch((e) => setError(`
          Что-то пошло не так, вот что говорит наш сервер: ${e}.
          Возможно ваш аккаунт уже был активирован или ссылка была указана не верно.
        `))
        .finally(() => setIsLoading(false));
    } else {
      setError('Отсутствует ключ активации, попробуйте еще раз.');
    }
  }, [activationToken]);

  return (
    <div className={styles.content}>
      <div className={styles.content__block}>
        {error && <p className={styles.content__block__error}>{error}</p>}
        {isAccountActive && !error && (
          <p className={styles.content__block__success}>
            Ваш аккаунт теперь активирован
          </p>
        )}
        {!error && !isAccountActive && isLoading && <LinearProgress />}
      </div>
    </div>
  );
};
