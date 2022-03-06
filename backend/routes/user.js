const express = require("express");
const router = express.Router();
const { getUserDetail, getAllUser } = require("../controller/user");

router.route("/userDetails").get(getUserDetail);
router.route("/").get(getAllUser);
module.exports = router;
