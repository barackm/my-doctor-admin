import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import jwtDecode from "jwt-decode";
let history = require("history").createBrowserHistory();

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    usersRequested: (users) => {
      users.loading = true;
      users.error = null;
    },
    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.error = null;
    },
    usersRequestFailed: (users, action) => {
      users.error = action.payload;
      users.loading = false;
    },
    userDeleted: (users, action) => {
      users.list = users.list.filter((user) => user._id !== action.payload._id);
      users.loading = false;
    },
    userDeletionFailed: (users, action) => {
      users.error = action.payload;
      users.loading = false;
    },

    userInfoUpdated: (users, action) => {
      const token = action.payload;
      const decodedToken = jwtDecode(token);
      const index = users.list.findIndex(
        (user) => user._id === decodedToken._id
      );
      users.list[index] = decodedToken;
      users.loading = false;
      history.push("/users");
    },

    userInfoUpdateFailed: (users, action) => {
      users.error = action.payload;
      users.loading = false;
    },
  },
});

export default slice.reducer;
const {
  usersReceived,
  userDeleted,
  userDeletionFailed,
  usersRequestFailed,
  usersRequested,
  userInfoUpdateFailed,
  userInfoUpdated,
} = slice.actions;

export const loadUsers = () => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: usersRequested.type,
      onError: usersRequestFailed.type,
      onSuccess: usersReceived.type,
      url: "/users",
      method: "GET",
    })
  );
};

export const deleteUser = (id) => (dispatch) => {
  console.log(id);
  dispatch(
    actions.apiCallBegan({
      onStart: usersRequested.type,
      onError: userDeletionFailed.type,
      onSuccess: userDeleted.type,
      url: `/users/${id}`,
      method: "DELETE",
    })
  );
};

export const updateUserInfo = (id, data) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: usersRequested.type,
      onError: userInfoUpdateFailed.type,
      onSuccess: userInfoUpdated.type,
      url: `/users/${id}`,
      method: "PUT",
      data: {
        name: data.name,
        email: data.email,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        age: data.age,
        status: data.status,
        gender: data.gender,
        country: data.country,
        city: data.city,
        streetNumber: data.streetNumber,
        kitIdentifier: data.kitIdentifier,
        profileImage: data.profileImage,
      },
    })
  );
};
