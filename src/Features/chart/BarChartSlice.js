// src/store/taskStatsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completed: 0,
  pending: 0,
  failed: 0,
};

const taskStatsSlice = createSlice({
  name: "taskStats",
  initialState,
  reducers: {
    setTaskStats: (state, action) => {
      state.completed = action.payload.completed;
      state.pending = action.payload.pending;
      state.failed = action.payload.failed;
    },
    resetTaskStats: (state) => {
      state.completed = 0;
      state.pending = 0;
      state.failed = 0;
    },
  },
});

export const { setTaskStats, resetTaskStats } = taskStatsSlice.actions;

export const selectTaskStats = (state) => state.barChart;

export default taskStatsSlice.reducer;
