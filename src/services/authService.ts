import { authClient } from '../http/authClient';

async function register(name: string, email: string, password: string) {
  return authClient.post('/users/register', {
    name,
    email,
    password,
  });
}

async function login(email: string, password: string) {
  return authClient.post('/users/login', { email, password });
}

async function logout() {
  return authClient.post('/logout');
}

async function activate(activationToken: string) {
  return authClient.get(`/users/activate/${activationToken}`);
}

async function refresh() {
  return authClient.get('/users/refresh');
}

export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
};
