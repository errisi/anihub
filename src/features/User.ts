/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';

type UserState = {
  user: User | null;
  loading: boolean;
  error: string;
  checked: boolean;
};

const initialState: UserState = {
  user: null,
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

export const logout = createAsyncThunk('user/logout', async () => {
  await authService.logout();
  accessTokenService.remove();

  return null;
});

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
      if (state.user) {
        state.user.user = action.payload;
      }

      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.loading = false;
      state.error = `There was an error loading, this is what our server says: ${action.payload}`;
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.checked = true;
    });

    builder.addCase(checkAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.checked = true;
    });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null; // Reset user state to null after logout
      state.loading = false;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = `Logout failed: ${action.error.message}`;
    });
  },
});

export default UserSlice.reducer;
export const { set, setLoading, setError } = UserSlice.actions;
