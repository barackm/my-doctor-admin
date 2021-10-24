import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";

const url = "/emergencies";

const slice = createSlice({
  name: "emergencies",
  initialState: {
    list: [],
    loading: false,
    error: null,
    newEmergency: false,
  },
  reducers: {
    emergenciesRequested: (emergencies) => {
      emergencies.loading = true;
    },
    emergenciesReceived: (emergencies, action) => {
      emergencies.list = action.payload;
      emergencies.loading = false;
    },
    emergenciesRequestFailed: (emergencies, action) => {
      emergencies.error = action.payload;
      emergencies.loading = false;
    },
    emergencyAdded: (emergencies, action) => {
      emergencies.list.unshift(action.payload);
      emergencies.newEmergency = true;
    },
  },
});

export default slice.reducer;
const { emergenciesReceived, emergenciesRequestFailed, emergenciesRequested } =
  slice.actions;

export const loadEmergencies = () => async (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: emergenciesRequested.type,
      onSuccess: emergenciesReceived.type,
      onError: emergenciesRequestFailed.type,
      url,
    })
  );
};
