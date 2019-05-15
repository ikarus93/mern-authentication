const express = require("express"),
  router = express.Router(),
  createError = require("../../helpers/createError.js"),
  User = require("../../models/User.js"),
  { promisify } = require("util"),
  bcrypt = require("bcryptjs"),
  config = require("config"),
  jwt = require("jsonwebtoken"),
  auth = require("../../middleware/auth.js");

const [genSalt, genHash, signJwt, compare] = [
  promisify(bcrypt.genSalt),
  promisify(bcrypt.hash),
  promisify(jwt.sign),
  promisify(bcrypt.compare)
];

router.post("/register", async (req, res, next) => {
  console.log(req.body)
  try {
    const { name, email, pw } = req.body;
    if (!name || !email || !pw) {
      throw createError("Please fill in all fields", 400);
    }

    const hasUser = await User.findOne({ email });

    if (hasUser) {
      throw createError("A user with this email already exists!", 400);
    }

    const salt = await genSalt(10);
    const hash = await genHash(pw, salt);

    const user = await new User({ name, email, pw: hash }).save();

    const token = await signJwt({ id: user._id }, config.get("jwtSecret"), {
      expiresIn: 3600
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
      },
      token
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, pw } = req.body;

    if (!email || !pw) {
      throw createError("Please fill in all fields", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(
        "A user with this email is not registered with us!",
        400
      );
    }

    const passwordsMatch = await compare(pw, user.pw);

    if (!passwordsMatch) {
      throw createError("Incorrect Password", 401);
    }

    const token = await signJwt({ id: user._id }, config.get("jwtSecret"), {
      expiresIn: 3600
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
      },
      token
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/", auth, async (req, res, next) => {

  res.json({ id: req.user._id, name: req.user.name });
});

module.exports = router;
