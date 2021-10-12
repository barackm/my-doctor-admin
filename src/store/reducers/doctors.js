import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../actions/api";
import jwtDecode from "jwt-decode";

const slice = createSlice({
  name: "doctors",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    doctorsRequested: (doctors) => {
      doctors.loading = true;
      doctors.error = null;
    },
    doctorsRequestFailed: (doctors, action) => {
      doctors.loading = false;
      doctors.list = action.payload;
    },
    doctorsReceived: (doctors, action) => {
      doctors.loading = false;
      doctors.list = action.payload;
    },

    doctorCreated: (doctors, action) => {
      doctors.list.push(jwtDecode(action.payload));
    },

    doctorCreationFailed: (doctors, action) => {
      doctors.error = action.payload;
      doctors.loading = false;
    },
    doctorInfoUpdated: (doctors, action) => {
      const index = doctors.list.findIndex(
        (doctor) => doctor._id === jwtDecode(action.payload)._id
      );
      doctors.list[index] = jwtDecode(action.payload);
    },

    doctorInfoUpdateFailed: (doctors, action) => {
      doctors.loading = false;
      doctors.error = action.payload;
    },
  },
});

export default slice.reducer;

const {
  doctorInfoUpdateFailed,
  doctorInfoUpdated,
  doctorsReceived,
  doctorsRequested,
  doctorsRequestFailed,
  doctorCreated,
  doctorCreationFailed,
} = slice.actions;

export const loadDoctors = () => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: doctorsRequested.type,
      onError: doctorsRequestFailed.type,
      onSuccess: doctorsReceived.type,
      url: "/doctors",
      method: "GET",
    })
  );
};

export const createDoctor = (doctor) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: doctorsRequested.type,
      onError: doctorCreationFailed.type,
      onSuccess: doctorCreated.type,
      url: "/doctors",
      method: "POST",
      data: {
        name: doctor.name,
        lastName: doctor.lastName,
        email: doctor.email,
        password: doctor.password,
        phoneNumber: doctor.phoneNumber,
        age: doctor.age,
        profileImage: doctor.profileImage,
        gender: doctor.gender,
        country: doctor.country,
        status: doctor.status,
        city: doctor.city,
        about: doctor.about,
      },
    })
  );
};

export const updateDoctorInfo = (id, doctor) => (dispatch) => {
  dispatch(
    actions.apiCallBegan({
      onStart: doctorsRequested.type,
      onError: doctorInfoUpdateFailed.type,
      onSuccess: doctorInfoUpdated.type,
      url: `/doctors/${id}`,
      method: "PUT",
      data: {
        name: doctor.name,
        lastName: doctor.lastName,
        email: doctor.email,
        password: doctor.password,
        phoneNumber: doctor.phoneNumber,
        age: doctor.age,
        profileImage: doctor.profileImage,
        gender: doctor.gender,
        country: doctor.country,
        status: doctor.status,
        city: doctor.city,
        about: doctor.about,
      },
    })
  );
};
