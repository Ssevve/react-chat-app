import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'utils/api';

const initialState = {
  chats: [],
  currentChat: null,
  loading: false,
  error: '',
};

export const fetchChats = createAsyncThunk('chats/fetchChats', async (accessToken) => {
  const res = await get('/chats', accessToken);
  return res.data;
});

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    updateChat(state, action) {
      const filteredChats = state.chats.filter((chat) => chat._id !== action.payload._id);
      state.chats = [...filteredChats, action.payload];
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
      state.error = null;
      state.chats = action.payload;
      // state.chats.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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

export const { setChats, updateChat, setCurrentChat } = chatsSlice.actions;

export default chatsSlice.reducer;
