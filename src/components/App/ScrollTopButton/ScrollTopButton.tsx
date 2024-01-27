import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from '@mui/material';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 600) {
      setVisible(true);
    } else if (scrolled <= 600) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <IconButton
      onClick={scrollToTop}
      sx={{
        display: visible ? 'inline' : 'none',
        position: 'fixed',
        right: '40px',
        bottom: '30px',
        height: '50px',
        width: '50px',
        'z-index': 1,
      }}
    >
      <KeyboardArrowUpIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default ScrollButton;
