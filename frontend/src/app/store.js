import { configureStore, combineReducers } from '@reduxjs/toolkit';
import chatsReducer from 'features/chats/chatsSlice';
import authReducer from 'features/auth/authSlice';
import messagesReducer from 'features/messages/messagesSlice';
import friendsReducer from 'features/friends/friendsSlice';
import friendInvitesReducer from 'features/friendInvites/friendInvitesSlice';
import usersReducer from 'features/users/usersSlice';
import searchReducer from 'features/search/searchSlice';
import settingsReducer from 'features/settings/settingsSlice';
import socketMiddleware from 'socketMiddleware';

const reducers = {
  chats: chatsReducer,
  messages: messagesReducer,
  auth: authReducer,
  friends: friendsReducer,
  friendInvites: friendInvitesReducer,
  users: usersReducer,
  search: searchReducer,
  settings: settingsReducer,
};

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });
