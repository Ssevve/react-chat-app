import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  friends: [],
  friendInvites: [],
  loading: false,
  error: null,
};

// export const deleteFriendInviteById = createAsyncThunk(
//   'friends/deleteFriendInviteByUserId',
//   async ({ inviteId, accessToken }) => {
//     const res = await axios.delete(`/invites/${inviteId}`, {
//       headers: {
//         authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (res.status === 204) return inviteId;
//   },
// );

export const getFriendInvitesByUserId = createAsyncThunk(
  'friends/getFriendInvitesByUserId',
  async ({ userId, accessToken }) => {
    const res = await axios.get(`/invites/${userId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  },
);

export const addFriendById = createAsyncThunk(
  'friends/addFriendById',
  async ({ friendId, inviteId, accessToken }) => {
    const res = await axios.put(
      `/users/addFriend/${friendId}`,
      { inviteId },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.data;
  },
);

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

export const createFriendInvite = createAsyncThunk(
  'friends/createFriendInvite',
  async ({ friendId, accessToken }) => {
    const res = await axios.post(
      `/invites`,
      { friendId },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.data;
  },
);

// export const deleteFriendInviteById = createAsyncThunk(
//   'friends/deleteFriendInviteByUserId',
//   async ({ inviteId, accessToken }) => {
//     const res = await axios.delete(`/invites/${inviteId}`, {
//       headers: {
//         authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (res.status === 204) return inviteId;
//   },
// );

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
export const selectFriendInvites = (state) => state.friends.friendInvites;

export const { addFriendInvite, addFriend, removeFriendInvite } = friendsSlice.actions;

export default friendsSlice.reducer;
