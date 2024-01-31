/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './animePage.module.scss';
import {
  AnimeDescription as AnimeDescriptionType,
} from '../../types/AnimeDescription';
import {
  getAnimeById,
  // getAnimeRelatedById,
  // getAnimeSimilarById,
} from '../../api/animes';
import { AnimeInfo } from '../../components/Anime/AnimeInfo';
import { AnimeDescription } from '../../components/Anime/AnimeDescription';
import { AnimeScreenshots } from '../../components/Anime/AnimeScreenshots';
import { AnimePlayer } from '../../components/Anime/AnimePlayer';

export const AnimePage = () => {
  const { animeId } = useParams();
  const [anime, setAnime] = useState<AnimeDescriptionType | null>(null);
  // const [related, setRelated] = useState<AnimeDescriptionType | null>(null);
  // const [similar, setSimilar] = useState<AnimeDescriptionType | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const collections = ['Нравится', 'Приключения'];

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(selectedCollection);
  }, [selectedCollection]);

  useEffect(() => {
    getAnimeById(Number(animeId)).then(setAnime);
    // getAnimeRelatedById(Number(animeId)).then(setRelated);
    // getAnimeSimilarById(Number(animeId)).then(setSimilar);
  }, [animeId]);

  return (
    <div className={styles.anime}>
      {anime && (
        <>
          <AnimeInfo
            anime={anime}
            collections={collections}
            setSelectedCollection={setSelectedCollection}
          />
          <hr className={styles.anime__line} />

          {!!anime.description_html && !!anime.description && (
            <>
              <AnimeDescription anime={anime} />
              <hr className={styles.anime__line} />
            </>
          )}

          {(!!anime.screenshots?.length || !!anime.videos?.length) && (
            <>
              <AnimeScreenshots anime={anime} />
              <hr className={styles.anime__line} />
            </>
          )}

          <AnimePlayer anime={anime} />
          <hr className={styles.anime__line} />
        </>
      )}
    </div>
  );
};
