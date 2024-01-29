/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, FormControl, MenuItem, Select,
} from '@mui/material';
import moment from 'moment-timezone';
import 'moment/dist/locale/ru';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from './animePage.module.scss';
import { AnimeDescription } from '../../types/AnimeDescription';
import { getAnimeById } from '../../api/animes';
import { getAnimeKind } from '../../helpers/getAnimeKind';
import { AnimeKind } from '../../types/AnimeKind';
import { getAnimeStatus } from '../../helpers/getAnimeStatus';
import { AnimeStatus } from '../../types/AnimeStatus';

export const AnimePage = () => {
  const { animeId } = useParams();
  const [anime, setAnime] = useState<AnimeDescription | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const collections = ['Нравится', 'Приключения'];

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(selectedCollection);
  }, [selectedCollection]);

  useEffect(() => {
    getAnimeById(Number(animeId)).then(setAnime);
  }, [animeId]);

  function formatReleaseTime(releaseTime: string) {
    const parsedTime = moment(releaseTime);

    const userTimezone = moment.tz.guess();

    return parsedTime.tz(userTimezone).locale('ru').format('D MMM HH:mm');
  }

  return (
    <div className={styles.anime}>
      {anime && (
        <>
          <div className={styles.anime__info}>
            <div className={styles.anime__info__left}>
              <img
                src={`https://shikimori.one/${anime?.image.original}`}
                alt=""
                className={styles.anime__info__left__image}
              />
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  displayEmpty
                  value=""
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  renderValue={(selected) => {
                    return selected.length ? selected : 'Добавить в список';
                  }}
                >
                  <MenuItem value="">Отмена</MenuItem>

                  {collections.map((collection) => (
                    <MenuItem key={collection} value={collection}>
                      {collection}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.anime__info__right}>
              <h1 className="anime__title">{anime?.russian}</h1>
              <h4 className={styles.anime__info__right__title_eng}>
                {anime?.name}
              </h4>

              <section className={styles.anime__info__right__description}>
                {!!anime.next_episode_at && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      <Box
                        sx={{
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#e91e63',
                          display: 'flex',
                          'align-items': 'center',
                          gap: '8px',
                          padding: '4px 0',
                        }}
                      >
                        <InfoOutlinedIcon color="primary" />
                        Следующий эпизод
                      </Box>
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value
                      }
                    >
                      <Box
                        sx={{
                          borderTop: 1,
                          borderBottom: 1,
                          height: '34px',
                          width: '250px',
                          borderColor: '#e91e63',
                          display: 'flex',
                          'align-items': 'center',
                          gap: '8px',
                          padding: '4px 0',
                        }}
                      >
                        {formatReleaseTime(anime.next_episode_at)}
                      </Box>
                    </p>
                  </div>
                )}
                {!!anime.kind && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      Тип
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value_imp
                      }
                    >
                      {getAnimeKind(anime.kind as AnimeKind)}
                    </p>
                  </div>
                )}
                {!!anime.episodes && !!anime.episodes_aired && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      Эпизоды
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value
                      }
                    >
                      {`${anime.episodes_aired || '?'} / ${anime.episodes}`}
                    </p>
                  </div>
                )}
                {!!anime.genres?.length && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      Жанры
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value_imp
                      }
                    >
                      {anime.genres.map((g) => g.russian).join(', ')}
                    </p>
                  </div>
                )}
                {!!anime.rating && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      Возраст
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value
                      }
                    >
                      {anime.rating.toUpperCase()}
                    </p>
                  </div>
                )}
                {!!anime.status && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      Статус
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value_imp
                      }
                    >
                      {getAnimeStatus(anime.status as AnimeStatus)}
                    </p>
                  </div>
                )}
                {!!anime.duration && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      Длительность
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value
                      }
                    >
                      {`~ ${anime.duration} мин. серия`}
                    </p>
                  </div>
                )}
                {!!anime.studios?.length && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      Студия
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value_imp
                      }
                    >
                      {anime.studios.map((s) => s.filtered_name).join(', ')}
                    </p>
                  </div>
                )}
                {(!!anime.synonyms || anime.japanese || anime.english) && (
                  <div className={styles.anime__info__right__description__item}>
                    <p
                      className={
                        styles.anime__info__right__description__item__title
                      }
                    >
                      Другие названия
                    </p>
                    <p
                      className={
                        styles.anime__info__right__description__item__value
                      }
                    >
                      {!!anime.english && <p>{anime.english}</p>}
                      {!!anime.japanese && <p>{anime.japanese}</p>}
                      {!!anime.synonyms && (
                        <>
                          {anime.synonyms.map((s) => (
                            <p>{s}</p>
                          ))}
                        </>
                      )}
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
          <hr className={styles.anime__line} />

          {!!anime.description_html && !!anime.description && (
            <section className={styles.anime__description}>
              <h2 className={styles.anime__description__title}>
                {`Описание аниме «${anime.russian}»`}
              </h2>
              <p
                className={styles.anime__description__text}
                dangerouslySetInnerHTML={
                  {
                    __html: (
                      anime.description_html.replace(
                        /<a\b[^>]*>(.*?)<\/a>/gi, '$1',
                      )
                    ),
                  }
                }
              />
              <hr className={styles.anime__line} />
            </section>
          )}
        </>
      )}
    </div>
  );
};
