import http from "src/services/http";

import * as actions from "../actions/auth";
import jwtDecode from "jwt-decode";
import storage from "../../utils/storage";

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;

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
      const authToken = response.data;
      // throw an error if the decoded token has the property isAdmin to false
      const decodedToken = jwtDecode(authToken);
      if (!decodedToken.isAdmin)
        throw new Error("You don't have the right permission to login.");
      storage.setAuthToken(authToken);
      onSuccess
        ? dispatch({ type: onSuccess, payload: decodedToken })
        : dispatch({
            type: actions.authApiCallSucceded.type,
            payload: decodedToken,
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
