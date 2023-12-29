import { Button } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <>
    <Button variant="text">Text</Button>

    <Outlet />
  </>
);
