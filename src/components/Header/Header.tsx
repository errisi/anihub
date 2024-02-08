import { useEffect, useState } from 'react';
import { DesktopHeader } from './Desktop/DesktopHeader';
import { TabletHeader } from './Tablet/TabletHeader';
import { PhoneHeader } from './Phone/PhoneHeader';
import styles from './Header.module.scss';

export const AppHeader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSearchOpened, setIsSearchOpened] = useState(false);

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
        {windowWidth >= 1300 && <DesktopHeader />}
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
      </header>
    </>
  );
};
