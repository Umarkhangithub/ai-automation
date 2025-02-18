import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  db,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "../../firebase/Firebase";

// Initial state for the slice
const initialState = {
  tasks: [],
  user: null,
  loading: false,
  error: null,
};

// Async thunk for fetching tasks for a specific user
export const fetchUserTasks = createAsyncThunk(
  "automation/fetchUserTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "ai_tasks"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(), // Convert Firestore timestamp to JS date
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a new task
export const addTask = createAsyncThunk(
  "automation/addTask",
  async ({ taskName, userId }, { rejectWithValue, dispatch }) => {
    try {
      const docRef = await addDoc(collection(db, "ai_tasks"), {
        name: taskName,
        status: "Pending", // Task starts as Pending
        createdAt: new Date(),
        userId,
      });

      // Simulate task completion after 3-4 seconds (delayed status change)
      setTimeout(() => {
        dispatch(updateTaskStatus({ taskId: docRef.id, status: "Completed" }));
      }, 3000); // 3 seconds delay (adjust as needed)

      return {
        id: docRef.id,
        name: taskName,
        status: "Pending", // Initially added as Pending
        createdAt: new Date(),
        userId,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating the task status
export const updateTaskStatus = createAsyncThunk(
  "automation/updateTaskStatus",
  async ({ taskId, status }, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "ai_tasks", taskId);
      await updateDoc(taskRef, { status });
      return { taskId, status };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating the task (both name and status)
export const updateTask = createAsyncThunk(
  "automation/updateTask",
  async ({ taskId, taskName, status }, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "ai_tasks", taskId);
      await updateDoc(taskRef, { name: taskName, status });
      return { taskId, taskName, status }; // Returning updated task data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  "automation/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "ai_tasks", taskId));
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice definition
const automationSlice = createSlice({
  name: "automation",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // Add new task to the list
        state.loading = false; // Stop loading after task is added
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error in adding task
      })
      // Update task status
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload.taskId);
        if (task) {
          task.status = action.payload.status; // Update task status
        }
      })
      // Update task (name or status)
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload.taskId);
        if (task) {
          task.name = action.payload.taskName;  // Update task name
          task.status = action.payload.status;  // Update task status
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Remove task from state
      });
  },
});

export const { setUser, clearUser } = automationSlice.actions;

export const selectUser = (state) => state.automation.user;
export const selectTasks = (state) => state.automation.tasks;
export const selectLoading = (state) => state.automation.loading;
export const selectError = (state) => state.automation.error;

export default automationSlice.reducer;
