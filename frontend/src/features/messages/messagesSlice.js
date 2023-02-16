import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from 'utils/api';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const createNewMessage = createAsyncThunk(
  'messages/createNewMessage',
  async ({ chatId, content, receiverId }) => {
    const res = await client.post(`/messages`, { chatId, content, receiverId });
    return res.data;
  },
);

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (userId) => {
  const res = await client.get(`/messages/user/${userId}`);
  return res.data;
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.messages = [];
    });
    builder.addCase(createNewMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.messages.push(action.payload.newMessage);
    });
    builder.addCase(createNewMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const selectMessages = (state) => state.messages;

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
