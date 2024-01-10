/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Anime } from '../types/Anime';
import { getAnimes } from '../api/animes';

type NewReleasedState = {
  NewReleased: Anime[];
  loading: boolean;
  error: string;
};

const initialState: NewReleasedState = {
  NewReleased: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('NewReleased/fetch', () => {
  return getAnimes();
});

const NewReleasedSlice = createSlice({
  name: 'NewReleased',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Anime[]>) => {
      state.NewReleased = action.payload;
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
      state.NewReleased = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default NewReleasedSlice.reducer;
export const { set, setLoading, setError } = NewReleasedSlice.actions;
