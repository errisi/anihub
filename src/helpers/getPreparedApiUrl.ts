import { Gener } from '../types/Gener';

export function getPreparedApiUrl(
  genres: Gener[],
  selectedYears: number[],
  selectedGenres: string[],
  selectedTypes: string[],
  selectedStatus: string,
  selectedScore: string,
  selectedRatings: string[],
  selectedOrder: string,
): string {
  const urlParts: string[] = [];

  if (selectedOrder) {
    switch (selectedOrder) {
      case 'Рейтингу':
        urlParts.push('order=ranked');
        break;
      case 'Популярности':
        urlParts.push('order=popularity');
        break;
      case 'Названию':
        urlParts.push('order=name');
        break;
      case 'Дате выхода':
        urlParts.push('order=aired_on');
        break;
      default:
        urlParts.push('order=ranked');
    }
  }

  if (selectedGenres.length > 0) {
    const matchingGenres: Gener[]
      = genres.filter((genre: Gener) => (
        selectedGenres.includes(genre.russian) && genre.entry_type === 'Anime'
      ));

    const genresString
      = matchingGenres.map((genre) => `genre=${genre.id}`).join('&');

    urlParts.push(genresString);
  }

  if (selectedTypes.length > 0) {
    const kindsArray = selectedTypes.reduce((acc: string[], type) => {
      switch (type) {
        case 'Аниме Сериал':
          acc.push(...['tv', 'tv_special', 'tv_13', 'tv_24', 'tv_48']);
          break;
        case 'Аниме Фильм':
          acc.push('movie');
          break;
        case 'OVA':
          acc.push('ova');
          break;
        case 'ONA':
          acc.push('ona');
          break;
        case 'Спешл':
          acc.push(...['special', 'tv_special']);
          break;
        default:
        // Ничего не делаем
      }

      return acc;
    }, []);

    if (kindsArray.length > 0) {
      urlParts.push(`kind=${kindsArray.join(',')}`);
    }
  }

  if (selectedStatus) {
    switch (selectedStatus) {
      case 'Анонс':
        urlParts.push('status=anons');
        break;
      case 'Вышел':
        urlParts.push('status=released');
        break;
      case 'Онгоинг':
        urlParts.push('status=ongoing');
        break;
      default:
        break;
    }
  }

  if (selectedScore) {
    switch (selectedScore) {
      case 'Выше 9':
        urlParts.push('score=9');
        break;
      case 'Выше 8':
        urlParts.push('score=8');
        break;
      case 'Выше 7':
        urlParts.push('score=7');
        break;
      case 'Выше 6':
        urlParts.push('score=6');
        break;
      case 'Выше 5':
        urlParts.push('score=5');
        break;
      default:
        break;
    }
  }

  if (selectedRatings.length > 0) {
    const replacementMap: Record<string, string> = {
      '-': '_',
      '+': '_plus',
    };

    const transformedRatings = selectedRatings
      .map((rating) => rating
        .toLowerCase()
        .replace(/[-+]/g, (match) => replacementMap[match] || match))
      .join(',');

    urlParts.push(`rating=${transformedRatings}`);
  }

  if (selectedYears.length > 0) {
    const [startYear, endYear] = selectedYears;
    const yearsString = Array.from(
      { length: endYear - startYear + 1 },
      (_, index) => startYear + index,
    ).join(',');

    urlParts.push(`season=${yearsString}`);
  }

  return urlParts.join('&');
}
