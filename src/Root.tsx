import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { HomePage } from './pages/homePage/homePage';
import { Сatalog } from './pages/СatalogPage/Сatalog';
import { PageNotFound } from './pages/pageNotFound/pageNotFound';
import { App } from './components/App/App';
import { theme } from './store/theme';
import store from './store/store';
import { AnimePage } from './pages/animePage/animePage';
import { TermsPage } from './pages/termsPage/termsPage';
import { ForOwnersPage } from './pages/forOwnersPage/forOwnersPage';
import { PrivacyPage } from './pages/privacyPage/privacyPage';
import { AccountActivationPage }
  from './pages/accountActivationPage/accountActivationPage';
import 'react-dotenv';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="anime/">
              <Route index element={<Сatalog />} />
              <Route path=":animeId" element={<AnimePage />} />
            </Route>

            <Route
              path="activate/:activationToken"
              element={<AccountActivationPage />}
            />

            <Route path="terms/" element={<TermsPage />} />
            <Route path="owners/" element={<ForOwnersPage />} />
            <Route path="privacy/" element={<PrivacyPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  </Provider>
);
