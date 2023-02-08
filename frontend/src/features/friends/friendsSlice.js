import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  friends: [],
  loading: false,
  error: null,
};

export const getFriendsByUserId = createAsyncThunk(
  'friends/getFriendsByUserId',
  async ({ userId, accessToken }) => {
    const res = await axios.get(`/users/friends/${userId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  },
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends(state, action) {
      state.friends = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriendsByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFriendsByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.friends = action.payload;
    });
    builder.addCase(getFriendsByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.friends = [];
    });
  },
});

export const selectFriends = (state) => state.friends.friends;

export const { setFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
