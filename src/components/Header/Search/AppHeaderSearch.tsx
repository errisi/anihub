import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';

export const AppHeaderSearch = () => (
  <div className="header__search">
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
