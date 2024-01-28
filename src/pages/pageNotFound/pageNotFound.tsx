import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './pageNotFound.module.scss';

export const PageNotFound = () => (
  <>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <h1>404</h1>
      <img
        src="/images/no-found.png"
        alt=""
        className={styles.image}
      />
      <h1>Not Found</h1>

      <Button variant="text" component={Link} to="/">
        {'< ДОМОЙ'}
      </Button>
    </Grid>
  </>
);
