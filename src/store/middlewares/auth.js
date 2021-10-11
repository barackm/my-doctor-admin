import http from "src/services/http";

import * as actions from "../actions/auth";

const apiEndPoint = "http://localhost:5000/api/";
// const apiEndPoint = "https://aqueous-gorge-50977.herokuapp.com/api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.authApiCallStarted.type) return next(action);
    const { onStart, url, data, method, onSuccess, onError } = action.payload;
    next(action);
    if (onStart) dispatch({ type: onStart });
    try {
      const response = await http.request({
        baseURL: apiEndPoint,
        url,
        data,
        method,
      });
      console.log(response.headers);
      // storage.setAuthToken(response.headers["X-Auth-Token"]);
      onSuccess
        ? dispatch({ type: onSuccess, payload: response.data })
        : dispatch({
            type: actions.authApiCallSucceded.type,
            payload: response.data,
          });
    } catch (error) {
      onError
        ? dispatch({ type: onError, payload: error.message })
        : dispatch({
            type: actions.authApiCallFailed.type,
            payload: error.message,
          });
    }
  };

export default api;
