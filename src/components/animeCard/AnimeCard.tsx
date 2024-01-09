import { FC } from 'react';
import { Anime } from '../../types/Anime';
import { returnAnimeKind } from '../../helpers/returnAnimeKind';
import { AnimeKind } from '../../types/AnimeKind';

type Props = {
  anime: Anime;
};

export const AnimeCard: FC<Props> = ({ anime }) => (
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
          <p>{`${returnAnimeKind(anime.kind as AnimeKind) || ''}`}</p>
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
);
