import { AnimeStatus } from '../types/AnimeStatus';

export const getAnimeStatus = (status: AnimeStatus) => {
  switch (status) {
    case AnimeStatus.Anons:
      return 'Анонс';

    case AnimeStatus.Ongoing:
      return 'Онгоинг';

    case AnimeStatus.Released:
      return 'Вышел';

    default:
      return '?';
  }
};
