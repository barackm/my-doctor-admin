import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";

const url = "/tests";

const slice = createSlice({
  name: "tests",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    testsRequested: (tests) => {
      tests.loading = true;
    },
    testsReceived: (tests, action) => {
      tests.list = action.payload;
      tests.loading = false;
    },
    testsRequestFailed: (tests, action) => {
      tests.error = action.payload;
      tests.loading = false;
      tests.list = [];
    },
  },
});

export default slice.reducer;
const { testsRequested, testsReceived, testsRequestFailed } = slice.actions;

export const loadTests = (patientId) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: testsRequested.type,
      onSuccess: testsReceived.type,
      onError: testsRequestFailed.type,
      url: patientId ? `${url}/patient/${patientId}` : url,
    })
  );
};
