import express from "express";
<<<<<<< HEAD
import { adminRegisterSchema, refreshTokenSchema, adminLoginSchema } from "../utils/validators/auth_validator.js";
import validate from "../middleware/validation_middleware.js";
import universalFunction from "../utils/response/universal_function.js";
import { adminRegister, adminLogin, refreshToken } from '../controller/auth_controller.js'
=======
import { adminRegister, admnilogin, refreshToken } from "../controllers/auth_controller.js";
import { adminRegisterSchema, refreshTokenSchema, adminLoginSchema } from "../utils/validators/auth_validator.js";
import validate from "../middleware/validator_middleware.js";
import universalFunction from "../utils/response/universal_function.js";

>>>>>>> c0e191b11c7948ed6b1fb8ae588933247fc1566b
const router = express.Router();

router.post(
  "/admin/register",
  validate(adminRegisterSchema),
  async (req, res, next) => {
    try {
      const result = await adminRegister(req, next);
      return universalFunction.sendSuccess(res, result, next);
    } catch (e) {
      console.log("feinfnn");
      return universalFunction.sendError(e, next);
    }
  }
);
router.post(
  "/admin/login",
  validate(adminLoginSchema),
  async (req, res, next) => {
    try {
<<<<<<< HEAD
      const result = await adminLogin(req, next);
=======
      const result = await admnilogin(req, next);
>>>>>>> c0e191b11c7948ed6b1fb8ae588933247fc1566b
      return universalFunction.sendSuccess(res, result, next);
    } catch (e) {
      return universalFunction.sendError(e, next);
    }
  }
);

router.post(
  "/api/refresh-token",
  async (req, res, next) => {
    validate(refreshTokenSchema);
    try {
      const result = await refreshToken(req, next);
      return universalFunction.sendSuccess(res, result, next);
    } catch (error) {
      return universalFunction.sendError(error, next);
    }
  }
)
export default router;
