import http from "src/services/http";

import * as actions from "../actions/api";

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;

const auth =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }
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
      onSuccess
        ? dispatch({ type: onSuccess, payload: response.data })
        : dispatch({
            type: actions.apiCallSucceeded.type,
            payload: response.data,
          });
    } catch (error) {
      onError
        ? dispatch({
            type: onError,
            payload: error.response
              ? error.response.data.message || error.response.data
              : error.message,
          })
        : dispatch({
            type: actions.apiCallFailed.type,
            payload: error.response
              ? error.response.data.message || error.response.data
              : error.message,
          });
    }
  };

export default auth;
