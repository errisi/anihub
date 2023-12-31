export const fetchAnimes = () => {
  return fetch(
    'https://api-movies.github.io/kodik/datasets/page-100.json',
  ).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};
