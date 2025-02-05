import httpStatus from "http-status";
import { response_objects } from "./response_messages.js";

class ApiError extends Error {
  constructor(
    statusCode,
    message,
    isOperational = true,
    data = [],
    stack = ""
  ) {
    super(message);
    const parsed_message =
      typeof message === "string" ? message.split(",")[0] : message;

    this.message = parsed_message;
    this.statusCode = statusCode;
    this.data = data;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const throwError = (type, message_type = "message", data = []) => {
  const errorObj = response_objects.find((err) => err.type === type);

  if (!errorObj) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error object not found",
      true,
      []
    );
  }

  const message = errorObj[message_type] || errorObj["message"];
  const status_code = errorObj.statusCode;

  throw new ApiError(status_code, message, true, data);
};

export { ApiError, throwError };
