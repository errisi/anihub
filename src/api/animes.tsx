import { Gener } from '../types/Gener';
import { fetchAnimes, fetchGenres } from '../utils/fetchClient';

export const getAnimes = () => {
  return fetchAnimes().then((response) => response);
};

export const getGenres = () => {
  return fetchGenres()
    .then((response) => response.map((gener: Gener) => gener.russian));
};
