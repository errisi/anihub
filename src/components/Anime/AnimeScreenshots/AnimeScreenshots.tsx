import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import './swiper.scss';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AnimeDescription } from '../../../types/AnimeDescription';
import styles from './AnimeScreenshots.module.scss';

type Props = {
  anime: AnimeDescription;
};

export const AnimeScreenshots: FC<Props> = ({ anime }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef && swiperRef.slides.length < 4) {
      setIsBeginning(true);
      setIsEnd(true);

      return;
    }

    setIsBeginning(true);
    setIsEnd(false);
  }, [swiperRef, anime, anime.id]);

  const handleBack = useCallback(() => {
    swiperRef?.slidePrev();

    if (swiperRef?.isBeginning) {
      setIsBeginning(true);
    } else {
      setIsBeginning(false);
    }

    if (swiperRef?.isEnd) {
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }
  }, [swiperRef]);

  const handleForward = useCallback(() => {
    swiperRef?.slideNext();

    if (swiperRef?.isBeginning) {
      setIsBeginning(true);
    } else {
      setIsBeginning(false);
    }

    if (swiperRef?.isEnd) {
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }
  }, [swiperRef]);

  return (
    <>
      {(!!anime.screenshots?.length || !!anime.videos?.length) && (
        <div className={styles.anime__slider}>
          <h2 className={styles.anime__screenshots__title}>
            Кадры из аниме и трейлеры
          </h2>
          <Swiper
            speed={400}
            spaceBetween={20}
            slidesOffsetAfter={0}
            slidesPerView="auto"
            breakpoints={{
              320: { slidesPerGroup: 1 },
              640: { slidesPerGroup: 2 },
              1200: { slidesPerGroup: 3 },
            }}
            onSwiper={setSwiperRef}
            className="swiperScreenshots"
          >
            <div className={styles.anime__screenshots__slider}>
              {anime.screenshots?.length && (
                <>
                  {Object.values(anime.screenshots).map((screenshot, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SwiperSlide key={i}>
                      <img
                        src={`https://shikimori.one${screenshot.original}`}
                        height="200"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </>
              )}
              {anime.videos?.length && (
                <>
                  {anime.videos.map((video) => (
                    <SwiperSlide key={video.id}>
                      <iframe
                        title={`${video.id}`}
                        key={video.id}
                        height="200"
                        src={video.player_url} // Замените videoId на фактический идентификатор видео
                        frameBorder={0}
                        allowFullScreen
                      />
                    </SwiperSlide>
                  ))}
                </>
              )}
            </div>
          </Swiper>
          <div className={styles.anime__slider__buttons}>
            {isBeginning ? (
              <div style={{ height: 0 }} />
            ) : (
              <Button
                onClick={handleBack}
                variant="text"
                className={styles.anime__slider__buttons__back}
              >
                <ArrowBackIosIcon color="primary" />
              </Button>
            )}
            {isEnd ? (
              <div style={{ height: 0 }} />
            ) : (
              <Button
                className={styles.anime__slider__buttons__forward}
                onClick={handleForward}
                variant="text"
                disabled={isEnd}
              >
                <ArrowForwardIosIcon color="primary" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
