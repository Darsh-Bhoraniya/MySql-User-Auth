import express from "express";
import validate from "../middleware/validation_middleware.js";
import { createPlantValidator, deletePlantSchema, getplants, updatePlantSchema } from "../utils/validators/plant_validators.js";
import { Auth } from "../middleware/auth.js";
import universalFunctions from "../utils/response/universal_function.js"
import { getPlantsDetails, createPlant, UpdatePlant, DeletePlant } from "../controller/plant_controller.js";
const router = express.Router();


router.get("/api/plants/list",
    Auth(),
    validate(getplants),
    async (req, res, next) => {
        try {
            const result = await getPlantsDetails(req, next);
            return universalFunctions.sendSuccess(res, result, next);
        } catch (error) {
            console.log(error);
            return universalFunctions.sendError(error, next);
        }
    }
);


router.post("/api/plants",
    // Auth(),
    validate(createPlantValidator),
    async (req, res, next) => {
        try {
            const result = await createPlant(req, next);
            return universalFunctions.sendSuccess(res, result, next);
        } catch (error) {
            console.log(error);
            return universalFunctions.sendError(error, next);
        }
    }
);

router.patch("/api/plants/:id",
    // Auth(),
    validate(updatePlantSchema),
    async (req, res, next) => {
        try {
            const result = await UpdatePlant(req, next);
            return universalFunctions.sendSuccess(res, result, next);
        } catch (e) {
            console.log("sdsdsde",e);
            return universalFunctions.sendError(e, next);
        }
    }
);
router.delete("/api/plants/:id",
    // Auth(),
    validate(deletePlantSchema),
    async (req, res, next) => {
        try {
            const result = await DeletePlant(req, next);
            return universalFunctions.sendSuccess(res, result, next);
        } catch (e) {
            console.log("sdsdsde",e);
            return universalFunctions.sendError(e, next);
        }
    }
);

export default router;