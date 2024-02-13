/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

type UserState = {
  user: User;
  loading: boolean;
  error: string;
  checked: boolean;
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
      refreshToken: null,
    },
  },
  loading: false,
  error: '',
  checked: false,
};

export const init = createAsyncThunk(
  'user/fetch',
  async ({ email, password }: { email: string; password: string }) => {
    const result = await authService.login(email, password);

    const user = result as unknown as User;

    accessTokenService.save(user.accessToken);

    return user.user;
  },
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const result = await authService.refresh();
      const user = result as unknown as User;

      accessTokenService.save(user.accessToken);

      return user;
    } catch (error) {
      return rejectWithValue('User is not authenticated');
    }
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
    setChecked: (state, action: PayloadAction<boolean>) => {
      state.checked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.user.user = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });
  },
});

export default UserSlice.reducer;
export const {
  set, setLoading, setError,
} = UserSlice.actions;
