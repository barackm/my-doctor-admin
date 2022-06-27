const { apiCallFailed } = require("../actions/api");

const error = () => (next) => (action) => {
  if (action.type !== apiCallFailed.type) return next(action);
  next(action);
  // console.log(action.payload);
};

export default error;
