import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import client from 'utils/api';

export const addFriendById = createAsyncThunk('friends/addFriendById', async (friendId) => {
  const res = await client.put(`/users/addFriend/${friendId}`);
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
    error: null,
  }),
  reducers: {
    friendAdded: friendsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      console.log(action);
      friendsAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchFriends.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.friends = [];
    });
    builder.addCase(addFriendById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addFriendById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.friends.push(action.payload);
      state.friendInvites = state.friendInvites.filter(
        (invite) => invite.sender._id !== action.payload._id,
      );
    });
    builder.addCase(addFriendById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const selectFriendIds = (state) => state.friends.ids;
export const selectFriends = (state) => state.friends.entities;

export const { addFriend } = friendsSlice.actions;

export default friendsSlice.reducer;
