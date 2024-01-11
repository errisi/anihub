import { FC } from 'react';
import Carousel from 'nuka-carousel';
import { Button, CircularProgress } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AnimeCard } from '../../animeCard/AnimeCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import * as BestSeasonOngoingsActions
  from '../../../features/BestSeasonOngoings';

export const BestSeasonOngoings: FC = () => {
  const dispatch = useAppDispatch();

  const {
    bestSeasonOngoings: animes,
    loading,
    error,
  } = useAppSelector((state) => state.BestSeasonOngoings);

  const refresh = () => {
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
          className="home__carousel__back"
          onClick={previousSlide}
          variant="text"
        >
          <ArrowBackIosIcon color="primary" />
        </Button>
      ),
    renderCenterRightControls:
      ({ nextSlide }: { nextSlide: () => void }) => (
        <Button
          className="home__carousel__forward"
          onClick={nextSlide}
          variant="text"
        >
          <ArrowForwardIosIcon color="primary" />
        </Button>
      ),
  };

  return (
    <div className="home__block">
      <h1 className="home__block__title-best-ongoings">
        Лучшие онгоинги сезона
      </h1>

      {loading && <CircularProgress />}

      {error && (
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
          className="home__carousel__wrapper"
        >
          <Carousel
            {...sliderParams}
          >
            <div className="home__carousel__slide">
              {(animes.slice(0, 5)).map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                />
              ))}
            </div>

            <div className="home__carousel__slide">
              {(animes.slice(5, 10)).map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                />
              ))}
            </div>

            <div className="home__carousel__slide">
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
