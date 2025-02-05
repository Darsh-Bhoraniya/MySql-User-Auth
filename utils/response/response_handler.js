import responseHelper from "./index.js";
import responsecode from "./response_code.js";

const responseHandler = async (req, res, next) => {
  res.success = (data = {}) => {
    res.status(responsecode.success).json(responseHelper.success(data));
  };
  res.failur = (data = {}) => {
    res.status(responsecode.success).json(responseHelper.failure(data));
  };
  res.internalserverError = (data = {}) => {
    res
      .status(responsecode.internalServerError)
      .json(responseHelper.internalServerError(data));
  };
  res.badRequest = (data = {}) => {
    res.status(responsecode.badRequest).json(responseHelper.badRequest(data));
  };
  res.validationError = (data = {}) => {
    res
      .status(responsecode.validationError)
      .json(responseHelper.validationError(data));
  };
  res.unAuthozied = (data = {}) => {
    res
      .status(responsecode.unAuthorized)
      .json(responseHelper.unAuthorized(data));
  };
  res.emptySuccess = (data = {}) => {
    res
      .status(responsecode.emptySuccess)
      .json(responseHelper.emptySuccess(data));
  };
  next();
};

export default responseHandler;