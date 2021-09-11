import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";

const auth = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    currentUser: null,
    isAuthenticated: false,
  },
  reducers: {
    authServiceStarted: (auth) => {
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
      auth.error = action.payload;
    },
  },
});

const { authServiceStarted, loginUserFailed, loginUserSucceeded } =
  auth.actions;
export default auth.reducer;

export const loginUser = (user) => (dispatch) => {
  dispatch(
    apiCallBegan({
      onStart: authServiceStarted.type,
      onError: loginUserFailed.type,
      onSuccess: loginUserSucceeded.type,
      data: user,
      url: "/auth",
      method: "POST",
    })
  );
};
