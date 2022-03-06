const CustomError = require("./customeError");
const { StatusCodes } = require("http-status-codes");

class Unauthorized extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = Unauthorized;
