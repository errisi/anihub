import { Gener } from '../types/Gener';
import { get } from '../utils/fetchClient';

export const getAnimes = () => {
  return get.animes;
};

export const getGenres = () => {
  return get.genres
    .then((response) => response.map((gener: Gener) => gener.russian));
};

export const getAnimeConstans = () => {
  return get.constants;
};

export const getBestSeasonOngoing = () => {
  return get.bestSeasonOngoing('winter_2024');
};
