import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'features/auth/authSlice';

const initialState = {
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  showSettings: false,
};

export const settingsSlice = createSlice({
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
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });
  },
});

export const { setTheme, toggleSettings, closeSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
