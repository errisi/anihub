import { FC } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment-timezone';
import 'moment/dist/locale/ru';
import * as ReleaseCalendarActions from '../../../features/ReleaseCalendar';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Calendar } from '../../../types/Calendar';

export const ReleaseCalendar: FC = () => {
  const dispatch = useAppDispatch();

  const daysOfTheWeek = [{
    dayName: 'Понедельник',
    dayNumber: 1,
  }, {
    dayName: 'Вторник',
    dayNumber: 2,
  }, {
    dayName: 'Среда',
    dayNumber: 3,
  }, {
    dayName: 'Четверг',
    dayNumber: 4,
  }, {
    dayName: 'Пятницы',
    dayNumber: 5,
  }, {
    dayName: 'Суббота',
    dayNumber: 6,
  }, {
    dayName: 'Воскресенье',
    dayNumber: 0,
  }];

  const {
    releaseCalendar: data,
    loading,
    error,
  } = useAppSelector((state) => state.ReleaseCalendar);

  const refresh = () => {
    dispatch(ReleaseCalendarActions.init());
  };

  function filterReleasesByDay(calendarArr: Calendar[], targetDay: number) {
    const currentDate = new Date();

    return calendarArr
      .filter((release) => {
        const releaseDate = new Date(release.next_episode_at);

        return releaseDate.getDay() === targetDay && releaseDate >= currentDate;
      });
  }

  function formatReleaseTime(releaseTime: string) {
    const parsedTime = moment(releaseTime);

    const userTimezone = moment.tz.guess();

    return parsedTime.tz(userTimezone).locale('ru').format('D MMM HH:mm');
  }

  return (
    <div className="home__block">
      <h1 className="home__block__title-new-relised">
        Календарь релизов
      </h1>

      {loading && <CircularProgress />}

      {error && (
        <>
          <p>
            {error}
          </p>
          <Button
            onClick={refresh}
          >
            Try Again
          </Button>
        </>
      )}

      {!loading && !error && (
        <>
          <div className="releases__wrapper">
            {daysOfTheWeek.map((day) => (
              <Accordion
                key={day.dayNumber}
                defaultExpanded={new Date().getDay() === day.dayNumber}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="primary" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    className="release__title"
                  >
                    {day.dayName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {filterReleasesByDay(data, day.dayNumber).map((release) => (
                      <div
                        key={release.anime.id}
                        className="release__table"
                      >
                        <div className="release__table__left-side">
                          <img
                            src={`https://shikimori.one${release.anime.image.x48}`}
                            alt="anime"
                            className="release__table__image"
                          />

                          <div className="release__table__next-episode">
                            <p>{release.anime.russian}</p>
                          </div>
                        </div>

                        <div className="release__table__right-side">
                          <div className="release__table__seria-number">
                            <p>{`${release.next_episode} серия`}</p>
                          </div>

                          <div className="release__table__time">
                            <p>
                              {formatReleaseTime(release.next_episode_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
