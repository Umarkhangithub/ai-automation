// src/store/analyticsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskStats: { completed: 0, pending: 0, failed: 0 },
  taskTrends: [],
  user: null,
  loading: true,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setTaskStats: (state, action) => {
      state.taskStats = action.payload;
    },
    setTaskTrends: (state, action) => {
      state.taskTrends = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTaskStats, setTaskTrends, setUser, setLoading } = analyticsSlice.actions;

export const selectTaskStats = (state) => state.analytics.taskStats;
export const selectTaskTrends = (state) => state.analytics.taskTrends;
export const selectUser = (state) => state.analytics.user;
export const selectLoading = (state) => state.analytics.loading;

export default analyticsSlice.reducer;
