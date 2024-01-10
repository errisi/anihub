import { FC } from 'react';
import Carousel from 'nuka-carousel';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Anime } from '../../../types/Anime';
import { AnimeCard } from '../../animeCard/AnimeCard';

type Props = {
  animes: Anime[];
};

export const LastUpdated: FC<Props> = ({ animes }) => {
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
    <>
      <h1 className="home__title">
        Последние обновленные
      </h1>
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
    </>
  );
};
