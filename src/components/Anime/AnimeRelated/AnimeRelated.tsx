import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AnimeRelated as Related } from '../../../types/AnimeRelated';
import styles from './AnimeRelated.module.scss';

type Props = {
  related: Related[];
};

export const AnimeRelated: FC<Props> = ({ related }) => (
  <>
    <h2 className={styles.related__title}>Связанное</h2>

    <div className={styles.anime__related}>
      {related.map((r) => (
        <>
          {!!r.anime && (
            <div className={styles.anime__related__item}>
              <Link to={`../../anime/${r.anime.id}`}>
                <img
                  src={`https://shikimori.one${r.anime.image.x48}`}
                  alt={r.anime.name}
                  className={styles.anime__related__item__img}
                />
              </Link>

              <div className={styles.anime__related__item__text}>
                <Link to={`../../anime/${r.anime.id}`}>
                  <p className={styles.anime__related__item__text__title}>
                    {r.anime.russian.length < 30
                      ? r.anime.russian
                      : `${r.anime.russian.split('').slice(0, 30).join('')}...`}
                  </p>
                </Link>
                <p className={styles.anime__related__item__text__type}>
                  {r.relation_russian}
                </p>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  </>
);
