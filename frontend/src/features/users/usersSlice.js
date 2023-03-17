import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'features/auth/authSlice';

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
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const selectConnectedUsers = (state) => state.users.connectedUsers;

export const { setConnectedUsers } = usersSlice.actions;

export default usersSlice.reducer;
