import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, put, destroy } from 'utils/api';

const initialState = {
  friends: [],
  friendInvites: [],
  loading: false,
  error: null,
};

export const getFriendInvitesByUserId = createAsyncThunk(
  'friends/getFriendInvitesByUserId',
  async ({ userId, accessToken }) => {
    const res = await get(`/invites/${userId}`, accessToken);
    return res.data;
  },
);

export const addFriendById = createAsyncThunk(
  'friends/addFriendById',
  async ({ friendId, inviteId, accessToken }) => {
    const res = await put(`/users/addFriend/${friendId}`, { inviteId }, accessToken);
    return res.data;
  },
);

export const getFriendsByUserId = createAsyncThunk(
  'friends/getFriendsByUserId',
  async ({ userId, accessToken }) => {
    const res = await get(`/users/friends/${userId}`, accessToken);
    return res.data;
  },
);

export const createFriendInvite = createAsyncThunk(
  'friends/createFriendInvite',
  async ({ friendId, accessToken }) => {
    const res = await post(`/invites`, { friendId }, accessToken);
    return res.data;
  },
);

export const deleteFriendInviteById = createAsyncThunk(
  'friends/deleteFriendInviteByUserId',
  async ({ inviteId, accessToken }) => {
    const res = await destroy(`/invites/${inviteId}`, accessToken);
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
    builder.addCase(getFriendInvitesByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFriendInvitesByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.friendInvites = action.payload;
    });
    builder.addCase(getFriendInvitesByUserId.rejected, (state, action) => {
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