import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from 'utils/api';

const initialState = {
  friends: null,
  friendInvites: null,
  loading: false,
  error: null,
};

export const fetchFriendInvites = createAsyncThunk('friends/fetchFriendInvites', async (userId) => {
  const res = await client.get(`/invites/${userId}`);
  return res.data;
});

export const addFriendById = createAsyncThunk(
  'friends/addFriendById',
  async ({ friendId, inviteId }) => {
    const res = await client.put(`/users/addFriend/${friendId}`, { inviteId });
    return res.data;
  },
);

export const fetchFriends = createAsyncThunk('friends/fetchFriends', async (userId) => {
  const res = await client.get(`/users/friends/${userId}`);
  return res.data;
});

export const createFriendInvite = createAsyncThunk(
  'friends/createFriendInvite',
  async ({ friendId }) => {
    const res = await client.post(`/invites`, { friendId });
    return res.data;
  },
);

export const deleteFriendInviteById = createAsyncThunk(
  'friends/deleteFriendInviteByUserId',
  async (inviteId) => {
    const res = await client.delete(`/invites/${inviteId}`);
    if (res.status === 204) return inviteId;
  },
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend(state, action) {
      state.friends.push(action.payload);

      const inviteIndex = state.friends.indexOf((invite) => invite.sender === action.payload._id);

      state.friendInvites.splice(inviteIndex, 1);
    },
    addFriendInvite(state, action) {
      state.friendInvites.push(action.payload);
    },
    removeFriendInvite(state, action) {
      state.friendInvites = state.friendInvites.filter((invite) => invite._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.friends = action.payload;
    });
    builder.addCase(fetchFriends.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.friends = [];
    });
    builder.addCase(fetchFriendInvites.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFriendInvites.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.friendInvites = action.payload;
    });
    builder.addCase(fetchFriendInvites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.friendInvites = [];
    });
    builder.addCase(createFriendInvite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createFriendInvite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.friendInvites.push(action.payload);
    });
    builder.addCase(createFriendInvite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteFriendInviteById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFriendInviteById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.friendInvites = state.friendInvites.filter((invite) => invite._id !== action.payload);
    });
    builder.addCase(deleteFriendInviteById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
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

export const selectFriends = (state) => state.friends.friends;
export const selectFriendInvites = (state) => state.friends.friendInvites;

export const { addFriendInvite, addFriend, removeFriendInvite } = friendsSlice.actions;

export default friendsSlice.reducer;
