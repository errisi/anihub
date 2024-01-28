import { FC } from 'react';
import Carousel from 'nuka-carousel';
import { Button, LinearProgress } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AnimeCard } from '../../Card/Card';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import * as BestSeasonOngoingsActions
  from '../../../features/BestSeasonOngoings';
import styles from './BestSeasonOngoings.module.scss';

export const BestSeasonOngoings: FC = () => {
  const dispatch = useAppDispatch();

  const {
    bestSeasonOngoings: animes,
    loading,
    error,
  } = useAppSelector((state) => state.BestSeasonOngoings);

  const refresh = () => {
    dispatch(BestSeasonOngoingsActions.set([]));
    dispatch(BestSeasonOngoingsActions.setError(''));
    dispatch(BestSeasonOngoingsActions.init());
  };

  const sliderParams = {
    tabbed: false,
    wrapAround: true,
    cellSpacing: 26,
    slidesToScroll: 1,
    speed: 1000,
    swiping: true,
    slideCount: 3,
    className: 'home__carousel',
    enableKeyboardControls: true,
    renderCenterLeftControls:
      ({ previousSlide }: { previousSlide: () => void }) => (
        <Button
          className={styles.home__carousel__back}
          onClick={previousSlide}
          variant="text"
        >
          <ArrowBackIosIcon color="primary" />
        </Button>
      ),
    renderCenterRightControls:
      ({ nextSlide }: { nextSlide: () => void }) => (
        <Button
          className={styles.home__carousel__forward}
          onClick={nextSlide}
          variant="text"
        >
          <ArrowForwardIosIcon color="primary" />
        </Button>
      ),
  };

  return (
    <div className={styles.home__block}>
      <h1 className={styles.home__block__title_best_ongoings}>
        Лучшие онгоинги сезона
      </h1>

      {loading && <LinearProgress />}

      {error && !loading && (
        <>
          <p>{error}</p>
          <Button
            onClick={refresh}
          >
            Try Again
          </Button>
        </>
      )}

      {!loading && !error && (
        <div
          className={styles.home__carousel__wrapper}
        >
          <Carousel
            {...sliderParams}
          >
            <div className={styles.home__carousel__slide}>
              {(animes.slice(0, 5)).map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                />
              ))}
            </div>

            <div className={styles.home__carousel__slide}>
              {(animes.slice(5, 10)).map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                />
              ))}
            </div>

            <div className={styles.home__carousel__slide}>
              {(animes.slice(10, 15)).map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                />
              ))}
            </div>
          </Carousel>
        </div>
      )}
    </div>
  );
};
