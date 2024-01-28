/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Anime } from '../types/Anime';
import { getSearchAnimes } from '../api/animes';

type SearchAnimesState = {
  SearchAnimes: Anime[];
  loading: boolean;
  error: string;
};

const initialState: SearchAnimesState = {
  SearchAnimes: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('SearchAnimes/fetch', (query: string) => {
  return getSearchAnimes(query);
});

const SearchAnimesSlice = createSlice({
  name: 'SearchAnimes',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Anime[]>) => {
      state.SearchAnimes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.SearchAnimes = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default SearchAnimesSlice.reducer;
export const { set, setLoading, setError } = SearchAnimesSlice.actions;
