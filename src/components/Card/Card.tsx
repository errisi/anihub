import { FC } from 'react';
import { Anime } from '../../types/Anime';
import { returnAnimeKind } from '../../helpers/returnAnimeKind';
import { AnimeKind } from '../../types/AnimeKind';
import style from './Card.module.scss';

type Props = {
  anime: Anime;
};

export const AnimeCard: FC<Props> = ({ anime }) => (
  <div className={style.card}>
    <div className={style.card__image__wrapper}>
      <img
        className={style.card__image__wrapper__item}
        src={`https://shikimori.one:${anime.image.original}`}
        alt="anime"
      />

      <div className={style.card__image__wrapper__item__overlay}>
        <div className={style.card__image__wrapper__item__overlay__score}>
          {`${anime.score}`}
        </div>

        <div className={style.card__image__wrapper__item__overlay__series}>
          {`${anime.episodes_aired ? `${anime.episodes_aired}/` : ''}${
            anime.episodes
          }`}
        </div>

        <div className={style.card__image__wrapper__item__overlay__kind}>
          <p>{`${returnAnimeKind(anime.kind as AnimeKind) || ''}`}</p>
        </div>
      </div>
    </div>

    <p className={style.card__title}>
      {anime.russian.length < 35
        ? anime.russian
        : `${anime.russian.split('').slice(0, 35).join('')}...`}
    </p>
    <p className={style.card__additional}>
      <p>{anime.aired_on.split('-').splice(0, 1)}</p>
      <p className={style.card__additional__status}>
        {anime.status === 'ongoing' ? 'Онгоинг' : 'Вышел'}
      </p>
    </p>
  </div>
);
