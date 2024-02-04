import { FC, useEffect, useState } from 'react';
import { Container, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const AppFooter: FC = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  useEffect(() => {
    setIsContactsOpen(false);
  }, []);

  const handleIsContactsOpen = () => setIsContactsOpen((c) => !c);

  return (
    <>
      <Container>
        <div className={styles.footer__wrapper}>
          <div className={styles.footer__links}>
            <button
              type="button"
              onClick={handleIsContactsOpen}
              className={styles.footer__links__item}
            >
              Контакты
            </button>
            <Fade in={isContactsOpen} className={styles.contacts}>
              <div>
                <div className={styles.contacts__item}>
                  <img
                    src="/telegram.svg"
                    alt=""
                    className={styles.contacts__item__icon_22}
                  />
                  <a href="https://t.me/errisi">Telegram</a>
                </div>
                <div className={styles.contacts__item}>
                  <img
                    src="/mail.svg"
                    alt=""
                    className={styles.contacts__item__icon}
                  />
                  <a href="mailto:support@anihub.icu">support@anihub.icu</a>
                </div>
                <IconButton
                  onClick={() => setIsContactsOpen(false)}
                  sx={{
                    height: 26,
                    width: 26,
                  }}
                >
                  <CloseIcon color="primary" fontSize="small" />
                </IconButton>
              </div>
            </Fade>
            <Link to="/terms" className={styles.footer__links__item}>
              Соглашение
            </Link>
            <Link to="/privacy" className={styles.footer__links__item}>
              Конфиденциальность
            </Link>
            <Link to="/owners" className={styles.footer__links__item}>
              Правообладателям
            </Link>
          </div>

          <div className={styles.footer__copyright}>
            <p>{`© anihub.icu ${new Date().getFullYear()}`}</p>
          </div>
        </div>
      </Container>
    </>
  );
};
