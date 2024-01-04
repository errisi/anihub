// import {
//   BestLastestList,
// } from '../../components/appHomePage/BestLastestList/BestLastestList';

import { useAppSelector } from '../../store/hooks';
import { AnimeKind } from '../../types/AnimeKind';

export const HomePage = () => {
  const { animes } = useAppSelector((state) => state.anime);

  const returnKind = (kind: AnimeKind) => {
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
        return '';
    }
  };

  return (
    <>
      <div className="card__list">
        {animes.map((anime) => (
          <div className="card">
            <div className="card__image__wrapper">
              <img
                className="card__image__wrapper__item"
                src={`https://shikimori.one:${anime.image.original}`}
                alt="anime"
              />
              <div className="card__image__wrapper__item__overlay">
                <div className="card__image__wrapper__item__overlay__score">
                  {`${anime.score}`}
                </div>

                <div className="card__image__wrapper__item__overlay__series">
                  {`${anime.episodes_aired ? `${anime.episodes_aired}/` : ''}${
                    anime.episodes
                  }`}
                </div>

                <div className="card__image__wrapper__item__overlay__kind">
                  <p>{`${returnKind(anime.kind as AnimeKind)}`}</p>
                </div>
              </div>
            </div>
            <p className="card__title">{anime.russian}</p>
            <p className="card__additional">
              <p>{anime.aired_on.split('-').splice(0, 1)}</p>
              <p className="card__additional__status">
                {anime.status === 'ongoing' ? 'Онгоинг' : 'Вышел'}
              </p>
            </p>
          </div>
        ))}
      </div>

      {/* <BestLastestList /> */}
    </>
  );
};
