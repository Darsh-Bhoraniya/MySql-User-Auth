export const response_objects = [
  {
    statusCode: 500,
    type: "INTERNAL_SERVER_ERROR",
    message: "Something Went Wrong!",
  },
  {
    statusCode: 400,
    type: "VALIDATION_ERROR",
    message: "Something Went Wrong!",
  },
  {
    statusCode: 400,
    type: "DETAILS_NOT_FOUND",
    message: "Details Not Found",
  },
  {
    statusCode: 400,
    type: "ID_IS_REQUIRED",
    message: "ID Is Required",
  },
  {
    statusCode: 400,
    type: "DEATILS_IS_REQUIRED",
    message: "Deatils Is Required",
  },
  {
    statusCode: 404,
    type: "NOT_FOUND",
    message: "Not Found",
  },
  {
    statusCode: 200,
    type: "LIST_DATA_NOT_FOUND",
    message: "No Data Found!",
  },
  {
    statusCode: 200,
    type: "LIST_RETRIEVED",
    message: "List Retrieved!",
  },
  {
    statusCode: 400,
    type: "INVALID_TOKEN_TYPE",
    message: "Invalid Token",
  },
  {
    statusCode: 400,
    type: "TOKEN_EXPIRED",
    message: "Token has expired",
  },
  {
    statusCode: 400,
    type: "EMAIL_NOT_VERIFIED",
    message: "Your Email Is Not Verified!",
  },
  {
    statusCode: 400,
    type: "PHONE_NOT_VERIFIED",
    message: "Your Phone Is Not Verified!",
  },
  {
    statusCode: 400,
    type: "SET_UP_PASSWORD",
    message: "Please Set Up Password",
  },
  {
    statusCode: 400,
    type: "INCORRECT_CREDENTIALS",
    message: "Invalid Credentials, Please try again.",
  },
  {
    statusCode: 400,
    type: "DRIVER_UNAVAILABLE",
    message: "Driver Is Currently Unavailable!",
  },
  {
    statusCode: 400,
    type: "VEHICLE_UNAVAILABLE",
    message: "Vehicle Is Currently Unavailable!",
  },
  {
    statusCode: 401,
    type: "ACCOUNT_DEACTIVE",
    message: "Your Account Is Not Active. Please Contact Administrator!",
    message_con: "Your Account Is Not Active. Please Contact Administrator!",
  },
  {
    statusCode: 403,
    type: "ACCESS_ERROR",
    message: "You Don't Have Access!",
  },
  {
    statusCode: 400,
    type: "INVALID_OTP",
    message: "Invalid OTP!",
  },
  {
    statusCode: 400,
    type: "IMAGE_NOT_FOUND",
    message: "Kindly Upload Image For",
  },
  {
    statusCode: 400,
    type: "ALLREADY_EXIST",
    message: "Allready Exist!",
  },
  {
    statusCode: 400,
    type: "ALLREADY_COMPLETED",
    message: "",
  },
  {
    statusCode: 400,
    type: "LIMIT_UNEXPECTED_FILE",
    message: "Unexpected Field",
  },
  {
    statusCode: 400,
    type: "TOO_SOON",
    message: "",
  },
  {
    statusCode: 400,
    type: "INVALID_INPUT",
    message: "One Or More Provided Type IDs Are Not Valid UUIDs.",
  },
  {
    statusCode: 400,
    type: "INVALID_DETAILS",
    message: "",
  },
  {
    statusCode: 400,
    type: "OTP_RESEND_RESTRICTED",
    message: "Please Wait 1 Minutes Before Requesting A New OTP.",
  },
  {
    statusCode: 400,
    type: "INVALID_PAGE_NUMBER",
    message: "Invalid Page Number",
  },
  {
    statusCode: 400,
    type: "ALREADY_EXISTS",
    message: "Already Exists",
  },

  {
    statusCode: 400,
    type: "DETAIL_IS_REQUIRED",
    message: "Is Required",
  },
  {
    statusCode: 400,
    type: "FIELD_NOT_SAME",
    message: "Given Field Name Is Not Same",
  },
  {
    statusCode: 201,
    type: "REGISTRATION_SUCCESS",
    message: "Registration Successful!",
  },
  {
    statusCode: 201,
    type: "CREATE_SUCCESS",
    message: "Created Successfully!",
  },
  {
    statusCode: 200,
    type: "LOGIN_SUCCESS",
    message: "Logged In Successfully!",
  },
  {
    statusCode: 200,
    type: "PASSWORD_UPDATE",
    message: "Password Set Successfully!",
  },
  {
    statusCode: 200,
    type: "EMAIL_VERIFIED",
    message: "Email Verification Successful!",
  },
  {
    statusCode: 200,
    type: "PHONE_VERIFIED",
    message: "Phone Verification Successful!",
  },
  {
    statusCode: 200,
    type: "VERIFIED",
    message: "Verification Successful!",
  },
  {
    statusCode: 200,
    type: "SUCCESS",
    message: "Request Executed Successfully!",
  },
  {
    statusCode: 200,
    type: "TOKEN_RETRIEVED",
    message: "Token Retrieved!",
  },
  {
    statusCode: 200,
    type: "UPDATE_SUCCESS",
    message: "Updated Successfully!",
  },
  {
    statusCode: 200,
    type: "DELETE_SUCCESS",
    message: "Deleted Successfully!",
  },
  {
    statusCode: 400,
    type: "VARIFICATION_MAIL_SEND",
    message:
      "Email not verified. A verification link has been sent to your registered email address.",
  },
  {
    statusCode: 200,
    type: "VERIFICATION_MAIL_RESENT",
    message:
      "Email verification link successfully sent! Please check your email.",
  },
  {
    statusCode: 200,
    type: "EMAIL_ALREADY_VERIFIED",
    message: "Email is already verified!",
  },
  {
    statusCode: 200,
    type: "RETURN_ROLES",
    message: "All Roles Are Here!",
  },
  {
    statusCode: 200,
    type: "FORGOT_PASSWORD",
    message: "Password Reset Link Sent!",
  },
  {
    statusCode: 200,
    type: "SET_PASSWORD",
    message: "Set Password Link Sent!",
  },
  {
    statusCode: 200,
    type: "GET_DETAILS",
    message: "Details Are Here!",
  },
  {
    statusCode: 200,
    type: "OTP_SEND",
    message: "OTP send successfully!",
  },
  {
    statusCode: 200,
    type: "UNIQUE_FIELDS",
    message: "",
  },
  {
    statusCode: 200,
    type: "FILE_UPLOAD_SUCCESS",
    message: "File uploaded successfully!",
  },
];
export default { response_objects };
