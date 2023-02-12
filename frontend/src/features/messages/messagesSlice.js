import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from 'utils/api';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const createNewMessage = createAsyncThunk(
  'messages/createNewMessage',
  async ({ chatId, content, receiverId, accessToken }) => {
    const res = await post(`/messages`, { chatId, content, receiverId }, accessToken);
    return res.data;
  },
);

export const getMessagesByUserId = createAsyncThunk(
  'messages/getMessagesByUserId',
  async ({ userId, accessToken }) => {
    const res = await get(`/messages/user/${userId}`, accessToken);
    return res.data;
  },
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessagesByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMessagesByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    });
    builder.addCase(getMessagesByUserId.rejected, (state, action) => {
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