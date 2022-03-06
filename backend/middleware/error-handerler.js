const { StatusCodes } = require("http-status-codes");

const errorHandler = async (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  // if (err.name && err.name === "ValidationError") {
  //   customError.msg = Object.values(err.errors).map((item) => item.message);
  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  //   // console.log(errorss);
  // }
  // if (err.name && err.name === "CastError") {
  //   customError.msg = `The id ${err.value} does not exist`;
  //   customError.statusCode = StatusCodes.NOT_FOUND;
  // // }
  if (err.code && err.code === 11000) {
    customError.msg = `The user name with ${Object.keys(
      err.keyValue
    )} already exist please chose another user name`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
