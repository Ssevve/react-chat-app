import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  showSettings: false,
};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setShowSettings(state, action) {
      state.showSettings = action.payload;
    },
  },
});

export const { setTheme, setShowSettings } = settings.actions;

export default settings.reducer;
