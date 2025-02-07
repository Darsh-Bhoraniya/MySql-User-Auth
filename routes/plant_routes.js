import express from "express";
import validate from "../middleware/validation_middleware.js";
import { createPlantValidator, getplants } from "../utils/validators/plant_validators.js";
import { Auth } from "../middleware/auth.js";
import universalFunctions from "../utils/response/universal_function.js"
import { getPlantsDetails,createPlant } from "../controller/plant_controller.js";
const router = express.Router();


router.get("/api/plants/list",
    Auth(),
    validate(getplants),
    async (req, res, next) => {
        try {
            const result = await getPlantsDetails(req, next);
            return universalFunctions.sendSuccess(res, result,next);
        } catch (error) {
            console.log(error);
            return universalFunctions.sendError(error, next);
        }
    }
);


router.post("/api/plants",
    Auth(),
    validate(createPlantValidator),
    async (req, res, next) => {
        try {
            const result = await createPlant(req, next);
            return universalFunctions.sendSuccess(res, result,next);
        } catch (error) {
            console.log(error);
            return universalFunctions.sendError(error, next);
        }
    }
);

export default router;