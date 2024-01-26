import { get } from '../utils/fetchClient';

export const getAnimes = () => {
  return get.request('animes?page=1&limit=15&order=ranked');
};

export const getGenres = () => {
  return get.request('genres');
};

export const getAnimeConstans = () => {
  return get.constants;
};

export const getBestSeasonOngoings = () => {
  return get.bestSeasonOngoing('winter_2024');
};

export const getNewReleased = () => {
  return get.request(
    'animes?page=1&limit=15&order=aired_on&kind=tv&status=released&score=5',
  );
};

export const getReleaseCalendar = () => {
  return get.request('calendar');
};

export const getCatalogAnimes = (url: string) => {
  return get.request(url
    ? `animes?limit=50&${url}`
    : 'animes?order=ranked&limit=48&status=!anons');
};