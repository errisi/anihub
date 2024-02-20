import { FC, useEffect } from 'react';
import styles from './Notifications.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { notificationsService } from '../../../services/notificationsService';
import * as NotificationsActions from '../../../features/Notifications';

type Props = {
  setIsNotificationsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderNotifications: FC<Props> = ({
  setIsNotificationsMenuOpened,
}) => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.Notifications);
  const { user } = useAppSelector((state) => state.User);

  useEffect(() => {
    const update = async () => {
      if (user) {
        await notificationsService.refresh(user.id);
        dispatch(NotificationsActions.init(user.id));
      }
    };

    update();
  }, [dispatch, user]);

  return (
    <>
      <div className={styles.notifications}>
        {!!notifications.length && (
          <div className={styles.notifications__items}>
            {[...notifications].reverse().map((notification) => (
              <p className={styles.notifications__items__item}>
                {notification.content}
              </p>
            ))}
          </div>
        )}
      </div>

      <div
        role="button"
        aria-label="asd"
        tabIndex={0}
        className={styles.notifications__under}
        onClick={() => setIsNotificationsMenuOpened(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsNotificationsMenuOpened(false);
          }
        }}
      />
    </>
  );
};
