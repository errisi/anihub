import React, { FormEvent, useEffect, useState } from 'react';
import { DesktopHeader } from './Desktop/DesktopHeader';
import { TabletHeader } from './Tablet/TabletHeader';
import { PhoneHeader } from './Phone/PhoneHeader';
import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as UserActions from '../../features/User';
import * as NotificationsActions from '../../features/Notifications';
import { authService } from '../../services/authService';
import { AuthMenu } from './Auth/AuthMenu/AuthMenu';
import { SettingsMenu } from './SettingsMenu/SettingsMenu';

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
  const [isUserActionsActive, setIsUserActionsActive] = useState(false);
  const [isSettingsMenuOpened, setIsSettingsMenuOpened] = useState(false);
  const [isNotificationsMenuOpened, setIsNotificationsMenuOpened]
  = useState(false);

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
    await authService.register(login, email, password);

    await dispatch(UserActions.init({ email, password }));
    dispatch(UserActions.checkAuth());

    setIsAuthMenuOpened(false);
  };

  const {
    user,
    // loading,
    // error,
  } = useAppSelector((state) => state.User);

  const {
    notifications,
    // loading,
    // error,
  } = useAppSelector((state) => state.Notifications);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (user) {
      dispatch(NotificationsActions.init(user.id));

      const intervalId = setInterval(() => {
        dispatch(NotificationsActions.init(user.id));
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, [dispatch, notifications.length, user]);

  const handleAuth = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    await dispatch(UserActions.init({ email, password }));
    dispatch(UserActions.checkAuth());

    setIsAuthMenuOpened(false);

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
            isUserActionsActive={isUserActionsActive}
            setIsUserActionsActive={setIsUserActionsActive}
            setIsSettingsMenuOpened={setIsSettingsMenuOpened}
            isNotificationsMenuOpened={isNotificationsMenuOpened}
            setIsNotificationsMenuOpened={setIsNotificationsMenuOpened}
            notifications={notifications}
          />
        )}
        {windowWidth < 1300 && windowWidth >= 640 && (
          <TabletHeader
            windowWidth={windowWidth}
            isSearchOpened={isSearchOpened}
            setIsSearchOpened={setIsSearchOpened}
            handleAuthMenuOpenAuth={handleAuthMenuOpenAuth}
            user={user}
            isUserActionsActive={isUserActionsActive}
            setIsUserActionsActive={setIsUserActionsActive}
            setIsSettingsMenuOpened={setIsSettingsMenuOpened}
            isNotificationsMenuOpened={isNotificationsMenuOpened}
            setIsNotificationsMenuOpened={setIsNotificationsMenuOpened}
            notifications={notifications}
          />
        )}
        {windowWidth < 640 && (
          <PhoneHeader
            isSearchOpened={isSearchOpened}
            setIsSearchOpened={setIsSearchOpened}
            handleAuthMenuOpenAuth={handleAuthMenuOpenAuth}
            user={user}
            isUserActionsActive={isUserActionsActive}
            setIsUserActionsActive={setIsUserActionsActive}
            setIsSettingsMenuOpened={setIsSettingsMenuOpened}
            isNotificationsMenuOpened={isNotificationsMenuOpened}
            setIsNotificationsMenuOpened={setIsNotificationsMenuOpened}
            notifications={notifications}
          />
        )}

        {isAuthMenuOpened && (
          <AuthMenu
            setIsAuthMenuOpened={setIsAuthMenuOpened}
            currentAuthMenuType={currentAuthMenuType}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            handleAuthMenuOpenAuth={handleAuthMenuOpenAuth}
            handleAuthMenuOpenRegister={handleAuthMenuOpenRegister}
            handleAuth={handleAuth}
            handleRegister={handleRegister}
            login={login}
            setLogin={setLogin}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        )}

        {isSettingsMenuOpened && user && (
          <SettingsMenu
            setIsSettingsMenuOpened={setIsSettingsMenuOpened}
            user={user}
          />
        )}
      </header>
    </>
  );
};
