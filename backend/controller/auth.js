const User = require("../model/userModal");
const { StatusCodes } = require("http-status-codes");
const { Unauthorized, BadRequest } = require("../error/index");
const register = async (req, res) => {
  // res.send("Register");

  const user = await User.create({ ...req.body });
  // console.log(user);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ msg: "sign up successfully", token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });
  // console.log(user,'auth');
  if (!user) {
    throw new Unauthorized("No user with this email found");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  // console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new Unauthorized("please provide valid password");
  }
  const token = user.createJWT();
  // console.log(token);
  res.status(StatusCodes.OK).json({
    msg: "sign up successfully",
    user: { name: user.name, email: user.email, picture: user.picture },
    token,
  });
};

module.exports = {
  register,
  login,
};
