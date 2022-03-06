const { StatusCodes } = require("http-status-codes");
// const { chats } = require("../data");
const Chat = require("../model/chatModel");
const User = require("../model/userModal");
const { BadRequest } = require("../error/index");
const accessChat = async (req, res, next) => {
  const { userId } = req.body;
  // console.log(userId);
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  // console.log(req.user.userId);
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.userId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.userId, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};
const fetchChats = async (req, res) => {
  // console.log(req.user.userId);
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .populate()
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name picture email",
        });
        res.status(200).json({ msg: "success", results });
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const createGroup = async (req, res) => {
  const { name, users } = req.body;
  console.log(users);
  if (!name || !users) {
    throw new BadRequest("please fill all the fields");
  }

  if (users.length < 2) {
    throw new BadRequest("More than 1 users are required to form a group chat");
  }

  users.push(req.user.userId);

  console.log(users);
  const groupChat = await Chat.create({
    chatName: name,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user.userId,
  });
  const FullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res.status(StatusCodes.CREATED).json({ msg: "group created", FullGroupChat });
};

const renameGroup = async (req, res) => {
  const { name, groupId } = req.body;
  console.log(name, groupId);
  // const filter = { _id: groupId };
  const FullGroupChat = await Chat.findByIdAndUpdate(
    groupId,
    {
      chatName: name,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res.status(StatusCodes.OK).json({ msg: "group rename", FullGroupChat });
};

const addToGroup = async (req, res) => {
  const { groupId, usersId } = req.body;
  console.log(groupId);
  const FullGroupChat = await Chat.findByIdAndUpdate(
    groupId,
    {
      $addToSet: { users: usersId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "added to group", FullGroupChat });
};

const removeFromGroup = async (req, res) => {
  const { groupId, usersId } = req.body;
  console.log(groupId);
  console.log(usersId);
  const FullGroupChat = await Chat.findByIdAndUpdate(
    groupId,
    {
      $pull: { users: usersId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(StatusCodes.CREATED).json({ msg: "remove user", FullGroupChat });
};
module.exports = {
  fetchChats,
  accessChat,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
