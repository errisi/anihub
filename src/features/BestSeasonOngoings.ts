/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Anime } from '../types/Anime';
import { getBestSeasonOngoings } from '../api/animes';

type BestSeasonOngoingsState = {
  bestSeasonOngoings: Anime[];
  loading: boolean;
  error: string;
};

const initialState: BestSeasonOngoingsState = {
  bestSeasonOngoings: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('BestSeasonOngoings/fetch', () => {
  return getBestSeasonOngoings();
});

const BestSeasonOngoingsSlice = createSlice({
  name: 'bestSeasonOngoings',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Anime[]>) => {
      state.bestSeasonOngoings = action.payload;
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
      state.bestSeasonOngoings = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default BestSeasonOngoingsSlice.reducer;
export const { set, setLoading, setError } = BestSeasonOngoingsSlice.actions;
