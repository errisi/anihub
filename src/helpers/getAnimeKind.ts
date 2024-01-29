import { AnimeKind } from '../types/AnimeKind';

export const getAnimeKind = (kind: AnimeKind) => {
  switch (kind) {
    case AnimeKind.TV:
      return 'ТВ-Сериал';

    case AnimeKind.Special:
      return 'Спешл';

    case AnimeKind.OVA:
      return 'OVA';

    case AnimeKind.ONA:
      return 'ONA';

    case AnimeKind.Movie:
      return 'Фильм';

    default:
      return 'Другое';
  }
};
