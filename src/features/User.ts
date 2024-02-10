/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { auth } from '../api/server';

type UserState = {
  user: User;
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  user: {
    accessToken: '',
    user: {
      id: 0,
      name: '',
      email: '',
      age: null,
      sex: 'm',
      about: null,
      role: {
        current: 'user',
        period: null,
      },
      friends: [],
      achievements: [],
      avatar: '',
      wallpaper: '',
      status: {
        current: 'blocked',
        period: null,
      },
      activationToken: null,
    },
  },
  loading: false,
  error: '',
};

export const init = createAsyncThunk(
  'user/fetch',
  ({ email, password }: { email: string; password: string }) => {
    return auth(email, password);
  },
);

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
      state.user = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default UserSlice.reducer;
export const { set, setLoading, setError } = UserSlice.actions;
