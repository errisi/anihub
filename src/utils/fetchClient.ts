export const fetchAnimes = () => {
  return fetch(
    'https://shikimori.one/api/animes?page=1&limit=25&order=ranked',
  ).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};

export const fetchGenres = () => {
  return fetch(
    'https://shikimori.one/api/genres',
  ).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};
