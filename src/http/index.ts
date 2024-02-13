import axios from 'axios';
// import 'dotenv/config';

export function createClient() {
  return axios.create({
    baseURL: 'http://localhost:3005',
    withCredentials: true,
  });
}
