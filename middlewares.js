const RequestError = require("./RequestError");

module.exports.populateUser = (req, res, next) => {
  try {
    const user = req.headers["authorization"];

    if (user) {
      req.user = user;

      return next();
    } else {
      throw new RequestError("Authenticated required", 403);
    }
  } catch (e) {
    return next(e);
  }
};

module.exports.handleError = (err, req, res, next) => {
  if (err instanceof RequestError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unknown error" });
};
