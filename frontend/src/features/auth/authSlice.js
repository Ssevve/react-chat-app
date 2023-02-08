import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  signupSuccess: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/auth/login', { username, password });
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      const unauthorized = err.response.status === 401;
      return rejectWithValue({ unauthorized });
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action;
      state.user = null;
      state.accessToken = null;
      state.signupSuccess = false;
    });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;
