import { useEffect, useState } from 'react';
import { DesktopHeader } from './Desktop/DesktopHeader';
import { TabletHeader } from './Tablet/TabletHeader';
import { PhoneHeader } from './Phone/PhoneHeader';

export const AppHeader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      {windowWidth >= 1300 && <DesktopHeader />}
      {windowWidth < 1300 && windowWidth >= 640 && (
        <TabletHeader windowWidth={windowWidth} />
      )}
      {windowWidth < 640 && <PhoneHeader />}
    </>
  );
};
