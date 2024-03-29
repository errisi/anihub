import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
import { ForgotPasswordPage }
  from './pages/forgotPasswordPage/forgotPasswordPage';
import { ResetPasswordPage } from './pages/resetPasswordPage/resetPasswordPage';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="anihub" element={<Navigate to="/" />} />

            <Route path="anime/">
              <Route index element={<Сatalog />} />
              <Route path=":animeId" element={<AnimePage />} />
            </Route>

            <Route
              path="activate/:activationToken"
              element={<AccountActivationPage />}
            />

            <Route path="reset/">
              <Route index element={<ForgotPasswordPage />} />
              <Route path=":resetToken" element={<ResetPasswordPage />} />
            </Route>

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
