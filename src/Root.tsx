import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { HomePage } from './pages/homePage/homePage';
import { AnimeСatalog } from './pages/animeСatalogPage/animeСatalog';
import { PageNotFound } from './pages/pageNotFound/pageNotFound';
import { App } from './App';
import { theme } from './store/theme';

export const Root = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="anime" element={<AnimeСatalog />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  </Router>
);
