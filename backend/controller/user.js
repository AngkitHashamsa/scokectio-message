const User = require("../model/userModal");
const { StatusCodes } = require("http-status-codes");
const getUserDetail = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const user = await User.findOne({ _id: userId });
  // console.log(user);
  res.status(StatusCodes.OK).json({
    msg: "successful",
    user,
  });
};
const getAllUser = async (req, res) => {
  const { query } = req;
  // console.log(query);
  const keyWord = query.search
    ? {
        $or: [
          { name: { $regex: query.search, $options: "i" } },
          { email: { $regex: query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyWord).find({
    _id: { $ne: req.user.userId },
  });
  // console.log(users);
  res.status(StatusCodes.OK).json({ msg: "success", users });
};
module.exports = {
  getUserDetail,
  getAllUser,
};
