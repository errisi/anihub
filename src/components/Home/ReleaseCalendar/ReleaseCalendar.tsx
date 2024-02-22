import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Skeleton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment-timezone';
import 'moment/dist/locale/ru';
import * as ReleaseCalendarActions from '../../../features/ReleaseCalendar';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Calendar } from '../../../types/Calendar';
import styles from './ReleaseCalendar.module.scss';

export const ReleaseCalendar: FC = () => {
  const dispatch = useAppDispatch();

  const daysOfTheWeek = [
    {
      dayName: 'Понедельник',
      dayNumber: 1,
    },
    {
      dayName: 'Вторник',
      dayNumber: 2,
    },
    {
      dayName: 'Среда',
      dayNumber: 3,
    },
    {
      dayName: 'Четверг',
      dayNumber: 4,
    },
    {
      dayName: 'Пятница',
      dayNumber: 5,
    },
    {
      dayName: 'Суббота',
      dayNumber: 6,
    },
    {
      dayName: 'Воскресенье',
      dayNumber: 0,
    },
  ];

  const {
    releaseCalendar: data,
    loading,
    error,
  } = useAppSelector((state) => state.ReleaseCalendar);

  const refresh = () => {
    dispatch(ReleaseCalendarActions.set([]));
    dispatch(ReleaseCalendarActions.setError(''));
    dispatch(ReleaseCalendarActions.init());
  };

  useEffect(() => {
    if (error && !loading) {
      setTimeout(() => {
        refresh();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  function filterReleasesByDay(calendarArr: Calendar[], targetDay: number) {
    const currentDate = new Date();

    return calendarArr.filter((release) => {
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
    <div className={styles.home__block}>
      <h1 className={styles.home__block__title_relise_calendar}>
        Календарь релизов
      </h1>

      {loading && (
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          variant="rectangular"
          height={336}
          className={styles.releases__wrapper}
        />
      )}

      {error && !loading && (
        <>
          <Box
            sx={{ bgcolor: 'grey.900' }}
            className={styles.releases__wrapper}
            height={336}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <p>{error}</p>
            <Button onClick={refresh}>Try Again</Button>
          </Box>
        </>
      )}

      {!loading && !error && (
        <>
          <div className={styles.releases__wrapper}>
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
                  <Typography className={styles.release__title}>
                    {day.dayName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {filterReleasesByDay(data, day.dayNumber).map((release) => (
                      <div
                        key={release.anime.id}
                        className={styles.release__table}
                      >
                        <div className={styles.release__table__left_side}>
                          <Link to={`../anime/${release.anime.id}`}>
                            <img
                              src={`https://shikimori.one${release.anime.image.x48}`}
                              alt="anime"
                              className={styles.release__table__image}
                            />
                          </Link>

                          <Link
                            to={`../anime/${release.anime.id}`}
                            className="release__table__next-episode"
                          >
                            <p>{release.anime.russian}</p>
                          </Link>
                        </div>

                        <div className={styles.release__table__right_side}>
                          <div className="release__table__seria-number">
                            <p>{`${release.next_episode} серия`}</p>
                          </div>

                          <div className={styles.release__table__time}>
                            <p>{formatReleaseTime(release.next_episode_at)}</p>
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
