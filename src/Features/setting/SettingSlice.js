// src/Features/setting/SettingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    settings: {
      fullName: '',
      email: '',
      darkMode: false,
      notifications: true,
    },
    loading: false,
    passwordLoading: false,
    message: null,
  };
  

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setPasswordLoading: (state, action) => {
      state.passwordLoading = action.payload;
    },
    resetMessage: (state) => {
      state.message = null;
    },
    resetSettings: (state) => {
      state.settings = initialState.settings;
    },
  },
});

export const {
  setUser,
  setSettings,
  setLoading,
  setMessage,
  setPasswordLoading,
  resetMessage,
  resetSettings,
} = userSlice.actions;

export const selectUser = (state) => state.setting;

export default userSlice.reducer;
