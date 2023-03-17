import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from 'utils/api';

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  isLoggedIn: false,
  error: null,
  signupSuccess: false,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await client.post('/auth/signup', { username, password });
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      const usernameTaken = err.response.status === 409;
      return rejectWithValue({ usernameTaken });
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await client.post('/auth/login', { username, password });
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      const unauthorized = err.response.status === 401;
      return rejectWithValue({ unauthorized });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearFetchError(state) {
      state.error = false;
    },
    logout() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.signupSuccess = false;
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action;
      state.user = null;
      state.accessToken = null;
      state.signupSuccess = false;
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.signupSuccess = false;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.signupSuccess = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action;
      state.signupSuccess = false;
      state.signupSuccess = false;
    });
    // eslint-disable-next-line no-use-before-define
    builder.addCase(logout, () => initialState);
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export const { clearFetchError, logout } = authSlice.actions;

export default authSlice.reducer;
