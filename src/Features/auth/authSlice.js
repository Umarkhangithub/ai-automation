import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  auth,
  db,
  doc,
  onSnapshot,
  setDoc,
  collection,
  addDoc,
  updateDoc,
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
    
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(
        userDocRef,
        async (docSnap) => {
          if (docSnap.exists()) {
            resolve(docSnap.data());
          } else {
            const newUser = {
              email: auth.currentUser.email,
              createdAt: new Date(),
              subscription: "free", // Default to free plan if no user data
            };
            await setDoc(userDocRef, newUser);
            resolve(newUser);
          }
        },
        (error) => {
          reject(error);
        }
      );
      
      // Cleanup on unmount or change
      return unsubscribe;
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

    // Calculate AI task statistics
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
    const completedTasks = tasks.filter((task) => task.status === "Completed").length;
    const successRate = totalTasks
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    return { totalTasks, pendingTasks, successRate };
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
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.aiStats = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching user data:", action.error.message);
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.loading = false;
        console.error("Error fetching user tasks:", action.error.message);
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

// Selectors to access state in components
export const selectUser = (state) => state.auth.user;
export const selectUserData = (state) => state.auth.userData;
export const selectAiStats = (state) => state.auth.aiStats;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;
