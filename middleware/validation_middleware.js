import joi from "joi";
import httpStatus from "http-status";
import { ApiError } from "../utils/response/api_error.js";

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const validate = (schema) => (req, res, next) => {
  
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = joi
    .compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: true })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

export default validate;
