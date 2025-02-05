import auth_constant from "../constants/auth_const.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { ApiError } from "../utils/response/api_error.js";
import response_objects from "../utils/response/response_messages.js";

const adminRegisterInDB = async (data_to_create) => {
  try {
    // Assuming role_id is set correctly in your constants
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data_to_create.password, salt);

    const query = {
      email: data_to_create.email,
      name: data_to_create.name,
      password: hashedPassword,
      role_id: 1,
    };

    const created_user = await User.create(query);

    return {
      type: "REGISTRATION_SUCCESS",
      message_type: "message",
      data: created_user,
    };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      response_objects[0].type,
      error
    );
  }
};

const AdminLogin = async (data_body) => {
  try {
    let { email, password, role_id } = data_body;

    let query = { email: email, role_id: role_id };

    let find_user = await User.findOne({
      where: query,
    });
    
    if (!find_user) {
      return {
        data: null,
        type: "NOT_FOUND",
        message_type: "message",
        module_name: "User",
      };
    }

    if (role_id != auth_constant.USER_TYPE.Admin) {
      return {
        data: null,
        type: "Wrong Role",
        message_type: "message",
      };
    }

    if (!find_user.password) {
      return {
        data: null,
        type: "SET_UP_PASSWORD",
        message_type: "message",
      };
    }

    const passwordMatch = await bcrypt.compare(password, find_user.password);

    if (!passwordMatch) {
      return {
        data: null,
        type: "INCORRECT_CREDENTIALS",
        message_type: "message",
      };
    }

    return {
      data: find_user,
      type: "LOGIN_SUCCESS",
      message_type: "",
    };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message || response_objects[0].message);
  }
};


export default { adminRegisterInDB, AdminLogin };
