/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Notification } from '../types/Notification';
import { notificationsService } from '../services/notificationsService';

type NotificationsState = {
  notifications: Notification[];
  loading: boolean;
  error: string;
};

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk(
  'notifications/fetch',
  async (userId: number) => {
    const result = await notificationsService.get(userId);

    const data = result as unknown as Notification[];

    return data;
  },
);

const NotificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
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
      state.notifications = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default NotificationsSlice.reducer;
export const { set, setLoading, setError } = NotificationsSlice.actions;
