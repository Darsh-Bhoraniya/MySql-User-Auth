import joi from "joi";
import auth_constant from "../../constant/auth_constant.js";

const adminRegisterSchema = {
  body: joi.object().keys({
    name: joi.string().trim().required(),
    email: joi.string().trim().required(),
    password: joi.string().trim().required(),
  }),
};

const adminLoginSchema = {
  body: joi
    .object()
    .keys({
      email: joi.string().email().trim().required(),
      password: joi.string().trim().required(),
      role_id: joi
        .number()
        .valid(auth_constant.USER_TYPE.Admin)
        .required()
        .messages({ "any.only": "Admin can only access" }),
    })
    .unknown(false),
};

const refreshTokenSchema = {
  body: joi.object().keys({
    refresh_token: joi.string().trim().required(),
  }),
};

export { adminRegisterSchema, adminLoginSchema, refreshTokenSchema };
