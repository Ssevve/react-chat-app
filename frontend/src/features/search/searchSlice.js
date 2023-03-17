import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import client from 'utils/api';
import { logout } from 'features/auth/authSlice';

export const searchFriends = createAsyncThunk(
  'search/searchFriends',
  async (query) => {
    const res = await await client.get(`/users/search/${query}`);
    return res.data;
  }
);

const initialState = {
  results: null,
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchFriends.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchFriends.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.results = action.payload;
    });
    builder.addCase(searchFriends.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.results = [];
    });
    builder.addCase(logout, () => initialState);
  },
});

export const selectSearchResults = (state) => state.search.results;

const selectFriendIds = (state) => state.friends.ids;
const selectFriendInvites = (state) => state.friendInvites.friendInvites;
const selectLoggedInUserId = (state) => state.auth.user._id;
export const selectFilteredSearchResults = createSelector(
  [
    selectSearchResults,
    selectFriendIds,
    selectFriendInvites,
    selectLoggedInUserId,
  ],
  (results, friendIds, friendInvites, loggedInUserId) => {
    if (results) {
      const userIdsFromInvites = friendInvites.map((invite) =>
        loggedInUserId === invite.sender._id
          ? invite.receiver._id
          : invite.sender._id
      );
      return results.filter(
        (result) =>
          !friendIds.includes(result._id) &&
          !userIdsFromInvites.includes(result._id)
      );
    }
    return null;
  }
);

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
