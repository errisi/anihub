import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AnimeCatalogCards,
} from '../../components/appAnimeCatalog/animeCatalogCards/AnimeCatalogCards';
import {
  AnimeCatalogFilter,
} from '../../components/appAnimeCatalog/animeCatalogFilter/AnimeCatalogFilter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as CatalogAnimesActions from '../../features/CatalogAnimes';
import { Gener } from '../../types/Gener';
import { getGenres } from '../../api/animes';

export const AnimeСatalog = () => {
  const dispatch = useAppDispatch();

  const { catalogAnimes: animes } = useAppSelector(
    (state) => state.CatalogAnimes,
  );

  const [genres, setGenres] = useState<Gener[]>([]);

  useEffect(() => {
    getGenres()
      .then(setGenres);
  }, []);

  const [searchParams] = useSearchParams();

  const selectedYears
  = searchParams.getAll('season').map(Number).length > 0
    ? searchParams.getAll('season').map(Number)
    : [1959, 2024];
  const selectedGenres = searchParams.getAll('genre') || [];
  const selectedTypes = searchParams.getAll('kind') || [];
  const selectedStatus = searchParams.get('status') || '';
  const selectedScore = searchParams.get('score') || '';
  const selectedRatings = searchParams.getAll('rating') || [];

  const replacementMap: Record<string, string> = {
    '-': '_',
    '+': '_plus',
  };

  function getValidApiUrl(): string {
    const urlParts: string[] = [];

    if (selectedGenres.length > 0) {
      const matchingGenres: Gener[]
        = genres.filter((genre: Gener) => (
          selectedGenres.includes(genre.russian)
        ));

      urlParts.push(`gener=${matchingGenres.map((genre) => genre.id).join(',')}`);
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
          // Ничего не делаем
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
          // Ничего не делаем
      }
    }

    if (selectedRatings.length > 0) {
      const transformedRatings = selectedRatings
        .map((rating) => (
          rating.toLowerCase()
            .replace(/[-+]/g, (match) => replacementMap[match] || match)
        ))
        .join(',');

      urlParts.push(`rating=${transformedRatings}`);
    }

    if (selectedYears.length > 0) {
      const [startYear, endYear] = selectedYears;
      const yearsString
        = Array.from(
          { length: endYear - startYear + 1 },
          (_, index) => (
            startYear + index
          ),
        ).join(',');

      urlParts.push(`season=${yearsString}`);
    }

    return urlParts.join('&');
  }

  useEffect(() => {
    dispatch(CatalogAnimesActions.init(getValidApiUrl()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <div className="catalog">
        <AnimeCatalogCards animes={animes} />
        <AnimeCatalogFilter />
      </div>
    </>
  );
};
