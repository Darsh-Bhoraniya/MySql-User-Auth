import { ApiError } from "./api_error.js";
import { response_objects } from "./response_messages.js";

const createDynamicMessage = async (module_name, message, message_type) => {
  switch (message_type) {
    case "IMAGE_NOT_FOUND":
      return `${message} ${module_name}`;
    case "REGISTRATION_SUCCESS":
      return `${module_name} ${message}`;
    case "CREATE_SUCCESS":
      return `${module_name} ${message}`;
    case "UPDATE_SUCCESS":
      return `${module_name} ${message}`;
    case "GET_DETAILS":
      return `${module_name} ${message}`;
    case "NOT_FOUND":
      return `${module_name} ${message}`;
    case "INVALID_DETAILS":
      return `${module_name} ${message}`;
    case "DETAILS_NOT_FOUND":
      return `${module_name} ${message}`;
    case "UNIQUE_FIELDS":
      return `${module_name} ${message}`;
    case "TOO_SOON":
      return `${module_name} ${message}`;
    case "ALREADY_EXISTS":
      return `${module_name} ${message}`;
    case "LIST_RETRIEVED":
      return `${module_name} ${message}`;
    case "DEATILS_IS_REQUIRED":
      return `${module_name} ${message}`;
    case "ALLREADY_EXIST":
      return `${module_name} ${message}`;
    case "SUCCESS_MESSAGE":
      return `${module_name}${message}`;

    default:
      return `${module_name} ${message}`;
  }
};

const sendError = async (data, next) => {
  try {
    let message;
    let statusCode;
    let { type, module_name, message_type, data: inner_data } = data;
    if (data instanceof ApiError && data.message) {
      message = data.message;
      statusCode = data.statusCode || 500;
    } else {
      const errorObj = response_objects.find((err) => err.type === type);

      if (!errorObj) {
        message = response_objects[0].message;
        statusCode = response_objects[0].statusCode;
      } else if (data.type === "VALIDATION_ERROR") {
        message = data.message_type;
        statusCode = errorObj.statusCode;
      } else {
        message = errorObj.message;
        statusCode = errorObj.statusCode;

        if (module_name) {
          const dynamicMsg = await createDynamicMessage(
            module_name,
            message,
            type
          );
          message = dynamicMsg;
        }
      }
    }

    throw new ApiError(statusCode, message, true, inner_data);
  } catch (error) {
    console.log(error);

    return next(error);
  }
};

const sendSuccess = async (res, responseData, next) => {
  try {
    let message;
    let statusCode;
    let { type, message_type, module_name, data } = responseData;
    const responseObj = response_objects.find((err) => err.type === type);

    message = responseObj[message_type] || responseObj["message"];
    statusCode = responseObj.statusCode;

    if (module_name) {
      const dynamicMsg = await createDynamicMessage(module_name, message, type);
      message = dynamicMsg;
    }

    return res.status(statusCode).json({
      status: "success",
      statusCode: statusCode,
      message: message,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export default {
  sendSuccess,
  sendError,
};
