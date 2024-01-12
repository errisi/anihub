/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Anime } from '../types/Anime';
import { getCatalogAnimes } from '../api/animes';

type CatalogAnimesState = {
  catalogAnimes: Anime[];
  loading: boolean;
  error: string;
};

const initialState: CatalogAnimesState = {
  catalogAnimes: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('CatalogAnimes/fetch', (url?: string) => {
  return getCatalogAnimes(url || '');
});

const CatalogAnimesSlice = createSlice({
  name: 'catalogAnimes',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Anime[]>) => {
      state.catalogAnimes = action.payload;
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
      state.catalogAnimes = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default CatalogAnimesSlice.reducer;
export const { set, setLoading, setError } = CatalogAnimesSlice.actions;
