import { IconButton } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import { AppHeaderLogo } from '../Logo/HeaderLogo';
import styles from './PhoneHeader.module.scss';
// import { AppHeaderHavigation } from '../Navigation/HeaderHavigation';

export const PhoneHeader = () => (
  <>
    <div className="header">
      <div className={styles.header__wrapper}>
        <div className={styles.header__left_side}>
          <IconButton>
            <MenuTwoToneIcon color="primary" />
          </IconButton>
          <AppHeaderLogo />
        </div>

        <div className={styles.header__right_side}>
          <IconButton>
            <SearchIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </div>

    {/* <div className={styles.menu}>
      <AppHeaderHavigation />
    </div> */}
  </>
);
