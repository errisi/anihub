import axios from 'axios';

const BASE_URL = 'http://localhost:3005';

export const register = async (
  login: string,
  email: string,
  password: string,
) => {
  await axios
    .post(`${BASE_URL}/users/register`, {
      name: login,
      email,
      password,
    })
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.data);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.data);
    });
};

export const activate = async (token: string) => {
  await axios.get(`${BASE_URL}/users/activate/${token}`);
};

export const auth = async (email: string, password: string) => {
  // eslint-disable-next-line no-console
  console.log([email, password]);
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });

    // eslint-disable-next-line no-console
    console.log(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
