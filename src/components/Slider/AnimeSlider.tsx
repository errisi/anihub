import { FC, useCallback, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './swiper.scss';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './AnimeSlider.module.scss';
import { Anime } from '../../types/Anime';
import { AnimeCard } from '../Card';

type Props = {
  animes: Anime[];
};

export const AnimeSlider: FC<Props> = ({ animes }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handleBack = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleForward = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <>
      <Swiper
        loop
        speed={400}
        spaceBetween={20}
        slidesOffsetAfter={0}
        slidesPerView="auto"
        breakpoints={{
          320: { slidesPerGroup: 2 },
          640: { slidesPerGroup: 4 },
          1200: { slidesPerGroup: 5 },
        }}
        onSwiper={setSwiperRef}
        className="swiperAnimes"
      >
        {animes.map((anime) => (
          <>
            {anime && (
              <SwiperSlide key={anime.id}>
                <AnimeCard to="../" anime={anime} />
              </SwiperSlide>
            )}
          </>
        ))}
      </Swiper>
      <div className={styles.buttons}>
        <Button
          onClick={handleBack}
          variant="text"
          className={styles.buttons__back}
        >
          <ArrowBackIosIcon color="primary" />
        </Button>
        <Button
          className={styles.buttons__forward}
          onClick={handleForward}
          variant="text"
        >
          <ArrowForwardIosIcon color="primary" />
        </Button>
      </div>
    </>
  );
};
