import http from "src/services/http";
import storage from "src/utils/storage";

import * as actions from "../actions/api";

const apiEndPoint = "https://aqueous-gorge-50977.herokuapp.com/api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
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
      if (
        action.onSuccess === "auth/loginUserSucceeded" ||
        action.onSuccess === "auth/signupUserSucceeded"
      ) {
        storage.setAuthToken(response.headers["x-auth-token"]);
      }
      onSuccess
        ? dispatch({ type: onSuccess, payload: response.data })
        : dispatch({
            type: actions.apiCallSucceeded.type,
            payload: response.data,
          });
    } catch (error) {
      onError
        ? dispatch({ type: onError, payload: error.message })
        : dispatch({
            type: actions.apiCallFailed.type,
            payload: error.message,
          });
    }
  };

export default api;
