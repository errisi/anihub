import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../types/Anime';
import { getAnimeKind } from '../../helpers/getAnimeKind';
import { AnimeKind } from '../../types/AnimeKind';
import style from './Card.module.scss';
import { getAnimeStatus } from '../../helpers/getAnimeStatus';
import { AnimeStatus } from '../../types/AnimeStatus';

type Props = {
  anime: Anime;
  to: string;
};

export const AnimeCard: FC<Props> = ({ anime, to }) => (
  <div className={style.card}>
    <Link to={`${to}/anime/${anime.id}`} className={style.card__image__wrapper}>
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
          <p>{`${getAnimeKind(anime.kind as AnimeKind) || ''}`}</p>
        </div>
      </div>
    </Link>

    <div className={style.card__details}>
      <p className={style.card__title}>
        {anime.russian.length < 35
          ? anime.russian
          : `${anime.russian.split('').slice(0, 35).join('')}...`}
      </p>
      <p className={style.card__additional}>
        {!!anime.aired_on && <p>{anime.aired_on.split('-').splice(0, 1)}</p>}
        <p className={style.card__additional__status}>
          {getAnimeStatus(anime.status as AnimeStatus)}
        </p>
      </p>
    </div>
  </div>
);
