import http from "src/services/http";

import * as actions from "../actions/api";

const apiEndPoint = "https://aqueous-gorge-50977.herokuapp.com/api";
// const apiEndPoint = "http://localhost:5000/api";

const auth =
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

export default auth;
