const USER_TYPE = {
    Admin: 1,
    User: 2,
    Engineer: 3,
    Gardener: 4,
};

const JWT = {
    ADMIN_SECRET: "DrGarden",
    ACCESS_EXPIRES_IN: 60,
    REFRESH_EXPIRES_IN: 365,
};

const TOKEN_TYPES = {
    ACCESS: "access_token",
    REFRESH: "refresh_token",
    FORGOT_PASSWORD: "forgot_password",
    SET_PASSWORD: "set_password",
    VERIFY_EMAIL: "verify_email",
};

export default {
    USER_TYPE,
    JWT,
    TOKEN_TYPES,
}