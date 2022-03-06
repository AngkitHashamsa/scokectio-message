const express = require("express");
const router = express.Router();
const {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controller/chat");
router.route("/").post(accessChat);
router.route("/").get(fetchChats);
router.route("/group").post(createGroup);
router.route("/groupRename").put(renameGroup);
router.route("/addToGroup").put(addToGroup);
router.route("/removeUser").put(removeFromGroup);
module.exports = router;
