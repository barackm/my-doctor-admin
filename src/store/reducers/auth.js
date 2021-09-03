import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    currentUser: null,
    isAuthenticated: false,
  },
  reducers: {
    authServiceStarted: (auth, action) => {
      auth.loading = true;
    },
    loginUserSucceeded: (auth, action) => {
      auth.currentUser = action.payload;
      auth.error = null;
      auth.loading = false;
      auth.isAuthenticated = true;
    },
    loginUserFailed: (auth, action) => {
      auth.isAuthenticated = false;
      auth.loading = false;
      auth.error = action.error;
    },
  },
});

export default auth.reducer;
