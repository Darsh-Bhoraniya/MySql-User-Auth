import express from "express";
import { adminRegister, admnilogin, refreshToken } from "../controllers/auth_controller.js";
import { adminRegisterSchema, refreshTokenSchema, adminLoginSchema } from "../utils/validators/auth_validator.js";
import validate from "../middleware/validator_middleware.js";
import universalFunction from "../utils/response/universal_function.js";

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
      const result = await admnilogin(req, next);
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
