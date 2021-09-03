const { apiCallBegan } = require("../actions/api");

const api = (store) => (next) => (action) => {
  if (action.type !== apiCallBegan.type) next(action);
};

export default api;
