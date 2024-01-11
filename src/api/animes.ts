import { Gener } from '../types/Gener';
import { get } from '../utils/fetchClient';

export const getAnimes = () => {
  return get.request('animes?page=1&limit=15&order=ranked');
};

export const getGenres = () => {
  return get.genres
    .then((response) => response.map((gener: Gener) => gener.russian));
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
