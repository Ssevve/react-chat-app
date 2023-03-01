import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import client from 'utils/api';

export const searchFriends = createAsyncThunk('search/searchFriends', async (query) => {
  const res = await await client.get(`/users/search/${query}`);
  return res.data;
});

const initialState = {
  results: [],
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
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
      state.search = [];
    });
  },
});

export const selectSearchResults = (state) => state.search.results;

const selectFriendIds = (state) => state.friends.ids;
export const selectFilteredSearchResults = createSelector(
  [selectSearchResults, selectFriendIds],
  (results, friendIds) => {
    return results.filter((result) => !friendIds.includes(result._id));
  },
);

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
