/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Anime } from '../types/Anime';
import { getAnimes } from '../api/animes';

type AnimesState = {
  animes: Anime[];
  loading: boolean;
  error: string;
};

const initialState: AnimesState = {
  animes: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('animes/fetch', () => {
  return getAnimes();
});

const animeSlice = createSlice({
  name: 'animes',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Anime[]>) => {
      state.animes = action.payload;
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
      state.animes = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default animeSlice.reducer;
export const { set, setLoading, setError } = animeSlice.actions;
