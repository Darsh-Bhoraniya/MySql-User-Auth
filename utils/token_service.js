import auth_constant from "../constants/auth_const.js";
import { ApiError } from "./response/api_error.js";
import { response_objects } from "./response/response_messages.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import db_services from "./db_services.js";
import Models from "../models/index.js";

const genrateauthToken = async (user) => {
  try {
    const access_token_expire = moment().add(
      auth_constant.JWT.ACCESS_EXPIRES_IN,
      "minutes"
    );
    const access_token = generateToken(
      user,
      access_token_expire,
      auth_constant.JWT.ADMIN_SECRET
    );

    const refresh_token_expires = moment().add(
      auth_constant.JWT.REFRESH_EXPIRES_IN,
      "days"
    );

    const refresh_token = generateToken(
      user,
      refresh_token_expires,
      auth_constant.JWT.ADMIN_SECRET
    );
    await saveToken(
      refresh_token,
      user,
      refresh_token_expires,
      auth_constant.TOKEN_TYPES.REFRESH
    );
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, response_objects[0].message);
  }
};
//Genrate token
const generateToken = (user_details, expires, secrete) => {
  try {
    const user_id = user_details.user_id;
    let user_role = user_details.role_id;
    let email = user_details.email;
    let name = user_details.name;
    const payload = {
      sub: user_id,
      role_id: user_role,
      email: email,
      name: name,
      iat: moment().unix(),
    };
    if (expires) {
      payload["exp"] = expires.unix();
    }
    return jwt.sign(payload, secrete);
  } catch (error) {
    throw new ApiError(500, response_objects[0].message);
  }
};

// Save Refresh token in DB
const saveToken = (token, user, expires, type) => {
  try {
    let user_id = user.user_id;
    let body = {
      token: token,
      type: type,
      token_expiry: expires ? expires.toDate() : new Date(),
      user_id: user_id,
    };
    const create_token = db_services.createOne(Models.UserToken, body)
    return create_token;
  } catch (error) {
    throw new ApiError(500, response_objects[0].message);
  }
};


const readToken = async (readToken, type) => {
  try {
    const decode_token = jwt.decode(readToken);
    let query = {
      token: readToken,
      type: type,
    };
    let get_token = await db_services.findOne(Models.UserToken, query);
    if (!get_token) {
      return {
        type: "Invalid_token",
        message_type: "message",
        data: null,
      }
    }
    return {
      data: decode_token,
      type: "",
      message_type: "",
    };

  } catch (error) {
    console.log(error);
    throw new ApiError(500, response_objects[0].message);
  }
}

const refreshAuth = async (refresh_token) => {
  try {
    const token = await readToken(refresh_token, auth_constant.TOKEN_TYPES.REFRESH);

    if (token.data === null) {
      return {
        data: null,
        type: token.type,
        message_type: token.message_type,
        module_name: token.module_name
      }
    }
    const id = token.data.sub;
    const dbuser = await db_services.findOne(Models.User, { user_id: id });

    const access_token_expire = moment().add(
      auth_constant.JWT.ACCESS_EXPIRES_IN,
      "minutes"
    );
    const tokendata = await generateToken(dbuser, access_token_expire, auth_constant.JWT.ADMIN_SECRET);
    return {
      data: { tokens: tokendata },
      type: '',
      message_type: '',
    }
  } catch (error) {
    console.error(error);
    throw new ApiError(500, response_objects[0].type, error.message || error);
  }
}

export { genrateauthToken, refreshAuth };
