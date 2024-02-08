import { Link } from 'react-router-dom';
import { SearchOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  InputAdornment,
  LinearProgress,
  Slide,
  TextField,
  TextFieldVariants,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import * as _ from 'lodash';
import styles from './HeaderSearch.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import * as SearchAnimesActions from '../../../features/SearchAnimes';
import { getAnimeKind } from '../../../helpers/getAnimeKind';
import { AnimeKind } from '../../../types/AnimeKind';

const getSearchResult = _.debounce((value, dispatch) => {
  dispatch(SearchAnimesActions.init(value));
}, 1000);

type Props = {
  type?: string;
};

export const AppHeaderSearch: FC<Props> = ({ type = 'outlined' }) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useAppDispatch();

  const {
    SearchAnimes: animes,
    loading,
    error,
  } = useAppSelector((state) => state.SearchAnimes);

  useEffect(() => {
    if (query.length > 0) {
      setIsActive(true);
    }

    if (!query.length) {
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }

    dispatch(SearchAnimesActions.setLoading(true));
    dispatch(SearchAnimesActions.setError(''));
    dispatch(SearchAnimesActions.set([]));

    getSearchResult(query, dispatch);
  }, [dispatch, query]);

  useEffect(() => {
    if (isActive) {
      setIsFocused(true);
    }
  }, [isActive]);

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsActive(false);
      setIsFocused(false);
    }, 300);
  };

  return (
    <div className={styles.search}>
      <Box>
        <TextField
          fullWidth
          focused={isActive || isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={handleOnBlur}
          label="Поиск аниме"
          variant={type as TextFieldVariants}
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={
            () => (query.length > 0 ? setIsActive(true) : setIsActive(false))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setQuery('');
                  }}
                  sx={{
                    display: isActive ? 'block' : 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.dark',
                    },
                  }}
                  color="primary"
                />
              </InputAdornment>
            ),
          }}
        />

        <Slide in={isActive}>
          <Box className={styles.search__box}>
            <hr className={styles.search__box__line} />

            <div className={styles.search__box__list}>
              {!!animes.length
                && !loading
                && !error
                && animes.map((anime) => (
                  <div className={styles.search__box__list__item}>
                    <Link to={`../anime/${anime.id}`}>
                      <img
                        src={`https://shikimori.one:${anime.image.x48}`}
                        alt="anime"
                        className={styles.search__box__list__item__image}
                      />
                    </Link>

                    <div className={styles.search__box__list__item__text}>
                      <Link
                        to={`../anime/${anime.id}`}
                        className={styles.search__box__list__item__text__title}
                      >
                        {anime.russian}
                      </Link>

                      {anime.aired_on && (
                        <p
                          className={
                            styles.search__box__list__item__text__description
                          }
                        >
                          {`${anime.aired_on.split('-').splice(0, 1)} / ${
                            getAnimeKind(anime.kind as AnimeKind) || ''
                          }`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              {!animes.length && !loading && !error && <p>Ничего не найдено</p>}

              {loading && <LinearProgress />}

              {error && !loading && <p>{error}</p>}
            </div>
          </Box>
        </Slide>
      </Box>
    </div>
  );
};
