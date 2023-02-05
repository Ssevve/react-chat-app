import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  chats: [],
  currentChat: null,
  loading: false,
  error: '',
};

export const fetchChats = createAsyncThunk('chats/fetchChats', (accessToken) => {
  return axios
    .get('/chats', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data);
});

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    updateLastMessage(state, action) {
      const updatedChat = { ...action.payload.chat, lastMessage: action.payload.message };
      const filteredChats = state.chats.filter((chat) => chat._id !== updatedChat._id);
      state.chats = [...filteredChats, updatedChat];
    },
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload;
      state.error = '';
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.loading = false;
      state.chats = [];
      state.error = action.error.message;
    });
  },
});

export const selectAllChats = (state) => state.chats.chats;
export const selectCurrentChat = (state) => state.chats.currentChat;

export const { setChats, updateLastMessage, setCurrentChat } = chatsSlice.actions;

export default chatsSlice.reducer;
