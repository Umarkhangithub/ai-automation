import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  auth,
  db,
  doc,
  onSnapshot,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "../../firebase/Firebase";

const initialState = {
  user: null,
  userData: null,
  aiStats: {},
  loading: true,
};

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (uid) => {
    const userDocRef = doc(db, "users", uid);
    return new Promise((resolve) => {
      onSnapshot(userDocRef, async (docSnap) => {
        if (docSnap.exists()) {
          resolve(docSnap.data());
        } else {
          const newUser = {
            email: auth.currentUser.email,
            createdAt: new Date(),
            subscription: "free",
          };
          await setDoc(userDocRef, newUser);
          resolve(newUser);
        }
      });
    });
  }
);

// Async thunk to fetch user AI tasks
export const fetchUserTasks = createAsyncThunk(
  "auth/fetchUserTasks",
  async (uid) => {
    const tasksQuery = query(collection(db, "ai_tasks"), where("userId", "==", uid));
    const taskSnapshot = await getDocs(tasksQuery);
    const tasks = taskSnapshot.docs.map((doc) => doc.data());

    return {
      totalTasks: tasks.length,
      pendingTasks: tasks.filter((task) => task.status === "Pending").length,
      successRate: tasks.length
        ? Math.round((tasks.filter((task) => task.status === "Completed").length / tasks.length) * 100)
        : 0,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.userData = null;
      state.aiStats = {};
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserTasks.fulfilled, (state, action) => {
      state.aiStats = action.payload;
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectUserData = (state) => state.auth.userData;
export const selectAiStats = (state) => state.auth.aiStats;
export const selectLoading = (state) => state.auth.loading;
export default authSlice.reducer;
