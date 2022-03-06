const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customeError");

class BadRequest extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
