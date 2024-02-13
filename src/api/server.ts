// import axios from 'axios';
// import 'dotenv/config';

// const BASE_URL = process.env.API_URL;

// export const register = async (
//   login: string,
//   email: string,
//   password: string,
// ) => {
//   await axios
//     .post(`${BASE_URL}/users/register`, {
//       name: login,
//       email,
//       password,
//     })
//     .then((response) => {
//       // eslint-disable-next-line no-console
//       console.log(response.data);
//     })
//     .catch((error) => {
//       // eslint-disable-next-line no-console
//       console.log(error.data);
//     });
// };

// export const activate = async (token: string) => {
//   await axios.get(`${BASE_URL}/users/activate/${token}`);
// };

// export const auth = async (email: string, password: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/users/login`, {
//       email,
//       password,
//     });

//     return response.data;
//   } catch (error) {
//     throw new Error(`Authentication failed, this is what the server says: ${error}`);
//   }
// };
