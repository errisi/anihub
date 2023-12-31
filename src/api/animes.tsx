import { fetchAnimes } from '../utils/fetchClient';

export const getAnimes = () => {
  return fetchAnimes().then((response) => response.results);
};
