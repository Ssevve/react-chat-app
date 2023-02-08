import { configureStore, combineReducers } from '@reduxjs/toolkit';
import chatsReducer from 'features/chats/chatsSlice';
import authReducer from 'features/auth/authSlice';
import messagesReducer from 'features/messages/messagesSlice';

const reducers = {
  chats: chatsReducer,
  messages: messagesReducer,
  auth: authReducer,
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
