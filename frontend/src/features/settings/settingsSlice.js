import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  showSettings: false,
};

export const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    toggleSettings(state) {
      state.showSettings = !state.showSettings;
    },
    closeSettings(state) {
      state.showSettings = false;
    },
  },
});

export const { setTheme, toggleSettings, closeSettings } = settings.actions;

export default settings.reducer;
