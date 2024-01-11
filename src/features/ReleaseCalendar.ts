/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getReleaseCalendar } from '../api/animes';
import { Calendar } from '../types/Calendar';

type ReleaseCalendarState = {
  releaseCalendar: Calendar[];
  loading: boolean;
  error: string;
};

const initialState: ReleaseCalendarState = {
  releaseCalendar: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('ReleaseCalendar/fetch', () => {
  return getReleaseCalendar();
});

const ReleaseCalendarSlice = createSlice({
  name: 'ReleaseCalendar',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Calendar[]>) => {
      state.releaseCalendar = action.payload;
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
      state.releaseCalendar = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default ReleaseCalendarSlice.reducer;
export const { set, setLoading, setError } = ReleaseCalendarSlice.actions;
