import express from "express";
import { adminRegisterSchema, refreshTokenSchema, adminLoginSchema } from "../utils/validators/auth_validator.js";
import validate from "../middleware/validation_middleware.js";
import universalFunction from "../utils/response/universal_function.js";
import { adminRegister, adminLogin, refreshToken } from '../controller/auth_controller.js'
const router = express.Router();

router.post(
  "/admin/register",
  validate(adminRegisterSchema),
  async (req, res, next) => {
    try {
      const result = await adminRegister(req, next);
      return universalFunction.sendSuccess(res, result, next);
    } catch (e) {
      return universalFunction.sendError(e, next);
    }
  }
);
router.post(
  "/admin/login",
  validate(adminLoginSchema),
  async (req, res, next) => {
    try {
      const result = await adminLogin(req, next);
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
