import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export const PageNotFound = () => (
  <>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1>404</h1>
      <img src="./../../../public/images/no-found.png" alt="" />
      <h1>Not Found</h1>

      <Button variant="text" component={Link} to="/">
        {'< ДОМОЙ'}
      </Button>
    </Grid>
  </>
);
