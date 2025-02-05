import auth_services from "../services/auth_services.js"
import { genrateauthToken, refreshAuth } from "../utils/token_service.js";

const adminRegister = async (req, res) => {
    let data_to_create = req.body;
    const data = await auth_services.adminRegisterInDB(data_to_create);
    if (data.data === null) {
        return Promise.reject({
            type: data.type,
            message_type: data.message_type,
            module_name: data.module_name,
        });
    }
    return {
        type: data.type,
        message_type: data.message_type,
        data: data.data,
    };
}
const adminLogin = async (req, res) => {
    let data_body = req.body;

    const login_user = await auth_services.adminLoginFromDB(data_body);

    if (login_user.data === null) {
        return Promise.reject({
            type: login_user.type,
            message_type: login_user.message_type,
            module_name: login_user.module_name,
        });
    }

    const tokens = await genrateauthToken(login_user.data);
    delete login_user.data.password;

    return {
        type: login_user.type,
        message_type: login_user.message_type,
        data: {
            ...login_user.data.toJSON(),
            tokens: tokens,
        },
    };
};
const refreshToken = async (req, res) => {
    const { refresh_token } = req.body;
    const auth_tokens = await refreshAuth(refresh_token);
    if (auth_tokens.data === null) {
        return Promise.reject({
            type: auth_tokens.type,
            message_type: auth_tokens.message_type,
            module_name: auth_tokens.module_name,
        });
    }

    return {
        type: "TOKEN_RETRIEVED",
        message_type: "message",
        data: auth_tokens.data,
    };
};
export { adminRegister, adminLogin, refreshToken };
