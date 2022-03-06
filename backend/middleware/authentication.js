const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../error/index");
const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    throw new Unauthorized("No Headers authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new Unauthorized("No Headers authentication Invalid");
  }
};

module.exports = authentication;
