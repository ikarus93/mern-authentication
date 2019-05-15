const config = require("config"),
  jwt = require("jsonwebtoken"),
  User = require("../models/User.js"),
  createError = require("../helpers/createError.js");

module.exports = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    if (!token) {
      throw createError("Invalid Request/No token", 400);
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw createError("Invalid Request. Token Invalid", 400);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
