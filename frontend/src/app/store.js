import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from 'features/chats/chatsSlice';
import authReducer from 'features/auth/authSlice';
import messagesReducer from 'features/messages/messagesSlice';

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messagesReducer,
    auth: authReducer,
  },
});
