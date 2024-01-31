import { Box } from '@mui/material';
import { FC } from 'react';
import styles from './AnimePlayer.module.scss';
import { AnimeDescription } from '../../../types/AnimeDescription';

type Props = {
  anime: AnimeDescription;
};

export const AnimePlayer: FC<Props> = ({ anime }) => (
  <div className={styles.anime__player}>
    <h2 className={styles.anime__player__title}>
      {`Смотреть аниме «${anime.russian}» онлайн`}
    </h2>
    <Box
      sx={{
        width: '100%',
        height: 586,
        bgcolor: 'white',
        marginBottom: '26px',
      }}
    />
  </div>
);
