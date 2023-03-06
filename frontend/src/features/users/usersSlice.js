import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connectedUsers: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setConnectedUsers(state, action) {
      state.connectedUsers = action.payload;
    },
  },
});

export const selectConnectedUsers = (state) => state.users.connectedUsers;

export const { setConnectedUsers } = usersSlice.actions;

export default usersSlice.reducer;
