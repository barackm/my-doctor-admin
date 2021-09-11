import axios from "axios";
// import { toast } from 'react-toastify';
// import storage from "../utils/storage";

// axios.defaults.headers.common.Authorization = storage.getAuthToken();
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // toast.error('An unexpected error occurred.');
    console.log("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  request: axios.request,
};

export default http;
