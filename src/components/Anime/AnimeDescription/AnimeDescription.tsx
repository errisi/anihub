/* eslint-disable react/no-danger */
import { FC } from 'react';
import {
  AnimeDescription as AnimeDescriptionType,
} from '../../../types/AnimeDescription';
import styles from './AnimeDescription.module.scss';

type Props = {
  anime: AnimeDescriptionType;
};

export const AnimeDescription: FC<Props> = ({ anime }) => (
  <>
    {!!anime.description_html && !!anime.description && (
      <section className={styles.anime__description}>
        <h2 className={styles.anime__description__title}>
          {`Описание аниме «${anime.russian}»`}
        </h2>
        <p
          className={styles.anime__description__text}
          dangerouslySetInnerHTML={{
            __html: anime.description_html.replace(
              /<a\b[^>]*>(.*?)<\/a>/gi,
              '$1',
            ),
          }}
        />
      </section>
    )}
  </>
);
