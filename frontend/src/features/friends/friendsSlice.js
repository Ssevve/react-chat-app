import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import client from 'utils/api';

export const addFriendById = createAsyncThunk('friends/addFriendById', async (friendId) => {
  const res = await client.put(`/users/addFriend/${friendId}`);
  return res.data;
});

export const removeFriendById = createAsyncThunk('friends/removeFriendById', async (friendId) => {
  const res = await client.delete(`/users/deleteFriend/${friendId}`);
  return res.data;
});

export const fetchFriends = createAsyncThunk('friends/fetchFriends', async (userId) => {
  const res = await client.get(`/users/friends/${userId}`);
  return res.data;
});

const friendsAdapter = createEntityAdapter({
  selectId: (friend) => friend._id,
});

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: friendsAdapter.getInitialState({
    loading: false,
    removingFriend: false,
    addingFriend: false,
    error: null,
  }),
  reducers: {
    addFriend: friendsAdapter.addOne,
    removeFriend: (state, action) => friendsAdapter.removeOne(state, action),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state) => {
      state.loading = true;
      state.removingFriend = false;
      state.addingFriend = false;
      state.error = null;
    });
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.loading = false;
      state.removingFriend = false;
      state.addingFriend = false;
      state.error = null;
      friendsAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchFriends.rejected, (state, action) => {
      state.loading = false;
      state.removingFriend = false;
      state.addingFriend = false;
      state.error = action.error.message;
      state.friends = [];
    });
    builder.addCase(addFriendById.pending, (state) => {
      state.loading = false;
      state.removingFriend = false;
      state.addingFriend = true;
      state.error = null;
    });
    builder.addCase(addFriendById.fulfilled, (state, action) => {
      state.loading = false;
      state.removingFriend = false;
      state.addingFriend = false;
      state.error = null;
      friendsAdapter.addOne(state, action);
    });
    builder.addCase(addFriendById.rejected, (state, action) => {
      state.loading = false;
      state.removingFriend = false;
      state.addingFriend = false;
      state.error = action.error.message;
    });
    builder.addCase(removeFriendById.pending, (state) => {
      state.loading = false;
      state.removingFriend = true;
      state.addingFriend = false;
      state.error = null;
    });
    builder.addCase(removeFriendById.fulfilled, (state, action) => {
      state.loading = false;
      state.removingFriend = false;
      state.addingFriend = false;
      state.error = null;
      friendsAdapter.removeOne(state, action);
    });
    builder.addCase(removeFriendById.rejected, (state, action) => {
      state.loading = false;
      state.removingFriend = false;
      state.addingFriend = false;
      state.error = action.error.message;
    });
  },
});

export const selectFriendIds = (state) => state.friends.ids;
export const selectFriends = (state) => state.friends.entities;

export const { addFriend, removeFriend } = friendsSlice.actions;

export default friendsSlice.reducer;
