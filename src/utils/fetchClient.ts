const BASE_URL = 'https://shikimori.one/api/';

function request(url: string) {
  return fetch(
    BASE_URL + url,
  ).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const get = {
  animes: request('animes?page=1&limit=15&order=ranked'),
  genres: request('genres'),
  constants: request('constants/anime'),
  newest: request('animes?limit=1&order=aired_on&status=released'),
  oldest: request('???'),
  bestSeasonOngoing: (season: string) => request(
    // eslint-disable-next-line prefer-template
    'animes?limit=12&order=popularity&type=tv&status=ongoing&season=' + season,
  ),
};
