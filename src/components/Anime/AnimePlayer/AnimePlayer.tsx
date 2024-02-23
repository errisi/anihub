import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import styles from './AnimePlayer.module.scss';
import { AnimeDescription } from '../../../types/AnimeDescription';

type Props = {
  anime: AnimeDescription;
};

export const AnimePlayer: FC<Props> = ({ anime }) => {
  const [playerLink, setPlayerLink] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://kodikapi.com/search?token=d884e7fbe01111ee8c84d78cdc023249&shikimori_id=${anime.id}`,
      )
      .then((link) => setPlayerLink(link.data.results[0].link));
  }, [anime]);

  return (
    <div className={styles.anime__player}>
      <h2 className={styles.anime__player__title}>
        {`Смотреть аниме «${anime.russian}» онлайн`}
      </h2>
      <iframe
        title="qwe"
        src={playerLink}
        frameBorder="0"
        allow="autoplay *; fullscreen *"
        className={styles.anime__player__content}
      />
    </div>
  );
};
