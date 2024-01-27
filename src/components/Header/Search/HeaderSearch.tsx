import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import styles from './HeaderSearch.module.scss';

export const AppHeaderSearch = () => (
  <div className={styles.search}>
    <Box
      sx={{
        width: 360,
      }}
    >
      <TextField
        fullWidth
        label="Поиск аниме"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  </div>
);
