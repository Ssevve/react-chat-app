import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from 'features/chats/chatsSlice';
import authReducer from 'features/auth/authSlice';

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    auth: authReducer,
  },
});
