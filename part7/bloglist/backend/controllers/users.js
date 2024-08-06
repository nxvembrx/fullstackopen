const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (_, response) => {
  const users = await User.find({}).populate("blogs", { user: 0, likes: 0 });
  return response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (e) {
    next(e);
  }
});

module.exports = usersRouter;
