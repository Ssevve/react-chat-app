import { configureStore, combineReducers } from '@reduxjs/toolkit';
import chatsReducer from 'features/chats/chatsSlice';
import authReducer from 'features/auth/authSlice';
import messagesReducer from 'features/messages/messagesSlice';
import friendsReducer from 'features/friends/friendsSlice';
import friendInvitesReducer from 'features/friendInvites/friendInvitesSlice';
import searchReducer from 'features/search/searchSlice';
import settingsReducer from 'features/settings/settingsSlice';

const reducers = {
  chats: chatsReducer,
  messages: messagesReducer,
  auth: authReducer,
  friends: friendsReducer,
  friendInvites: friendInvitesReducer,
  search: searchReducer,
  settings: settingsReducer,
};

const rootReducer = combineReducers(reducers);

const resettableRootReducer = (state, action) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: resettableRootReducer,
});
