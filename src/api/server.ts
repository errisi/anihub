import axios from 'axios';

const BASE_URL = 'http://localhost:3005/users/register';

export const register = async (
  login: string,
  email: string,
  password: string,
) => {
  await axios
    .post(BASE_URL, {
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
