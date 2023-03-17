import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from 'utils/api';
import { logout } from 'features/auth/authSlice';

const initialState = {
  friendInvites: [],
  loading: false,
  creatingFriendInvite: false,
  deletingFriendInvite: false,
  error: null,
};

export const fetchFriendInvites = createAsyncThunk(
  'friends/fetchFriendInvites',
  async (userId) => {
    const res = await client.get(`/invites/${userId}`);
    return res.data;
  }
);

export const createFriendInvite = createAsyncThunk(
  'friends/createFriendInvite',
  async (friendId) => {
    const res = await client.post('/invites', { friendId });
    return res.data;
  }
);

export const deleteFriendInvite = createAsyncThunk(
  'friends/deleteFriendInvite',
  async (inviteId) => {
    const res = await client.delete(`/invites/${inviteId}`);
    if (res.status === 204) return inviteId;
    return res.data;
  }
);

export const friendInvitesSlice = createSlice({
  name: 'friendInvites',
  initialState,
  reducers: {
    addFriendInvite(state, action) {
      state.friendInvites.push(action.payload);
    },
    removeFriendInvite(state, action) {
      state.friendInvites = state.friendInvites.filter(
        (invite) => invite._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriendInvites.pending, (state) => {
      state.loading = true;
      state.deletingFriendInvite = false;
      state.creatingFriendInvite = false;
      state.error = null;
    });
    builder.addCase(fetchFriendInvites.fulfilled, (state, action) => {
      state.loading = false;
      state.deletingFriendInvite = false;
      state.creatingFriendInvite = false;
      state.error = null;
      state.friendInvites = action.payload;
    });
    builder.addCase(fetchFriendInvites.rejected, (state, action) => {
      state.loading = false;
      state.deletingFriendInvite = false;
      state.creatingFriendInvite = false;
      state.error = action.error.message;
      state.friendInvites = [];
    });
    builder.addCase(createFriendInvite.pending, (state) => {
      state.loading = false;
      state.deletingFriendInvite = false;
      state.creatingFriendInvite = true;
      state.error = null;
    });
    builder.addCase(createFriendInvite.fulfilled, (state, action) => {
      state.loading = false;
      state.deletingFriendInvite = false;
      state.creatingFriendInvite = false;
      state.error = null;
      state.friendInvites.push(action.payload);
    });
    builder.addCase(createFriendInvite.rejected, (state, action) => {
      state.loading = false;
      state.deletingFriendInvite = false;
      state.creatingFriendInvite = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteFriendInvite.pending, (state) => {
      state.loading = false;
      state.deletingFriendInvite = true;
      state.creatingFriendInvite = false;
      state.error = null;
    });
    builder.addCase(deleteFriendInvite.fulfilled, (state, action) => {
      state.loading = false;
      state.deletingFriendInvite = false;
      state.creatingFriendInvite = false;
      state.error = null;
      state.friendInvites = state.friendInvites.filter(
        (invite) => invite._id !== action.payload
      );
    });
    builder.addCase(deleteFriendInvite.rejected, (state, action) => {
      state.loading = false;
      state.deletingFriendInvite = false;
      state.creatingFriendInvite = false;
      state.error = action.error.message;
    });
    builder.addCase(logout, () => initialState);
  },
});

export const selectFriendInvites = (state) => state.friendInvites.friendInvites;

export const { addFriendInvite, removeFriendInvite } =
  friendInvitesSlice.actions;

export default friendInvitesSlice.reducer;
