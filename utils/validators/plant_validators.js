import joi from "joi";

const createPlantValidator = {
    body: joi.object({
        name: joi.string().required(),
        scientific_name: joi.string().required(),
        description: joi.string().required(),
        plant_type: joi.string().required(),
        sunlight_requirement: joi.string().required(),
        watering_frequency: joi.string().required(),
        soil_type: joi.string().required(),
        temperature_range: joi.string().required(),
        growth_rate: joi.string().required(),
    })
}
const getPlantDetailbyid = {
    params: joi
        .object()
        .keys({
            plant_id: joi.number().integer().required(),
        })
        .unknown(false),
};


const updatePlantSchema = {
    body: joi.object({
        name: joi.string().optional().trim(),
        scientific_name: joi.string().optional().trim(),
        description: joi.string().optional().trim(),
        plant_type: joi.string().optional().trim(),
        sunlight_requirement: joi.string().optional().trim(),
        watering_frequency: joi.string().optional().trim(),
        soil_type: joi.string().optional().trim(),
        temperature_range: joi.string().optional().trim(),
        growth_rate: joi.string().optional().trim(),
    })
        .unknown(false),
    params: joi.object().keys({
        id: joi.number().integer().required(),
    }),
}
const deletePlantSchema = {
    params: joi.object().keys({
        id: joi.number().integer().required(),
    }),
};

const getplants = {
    query: joi.object({
        search: joi.string().trim().allow(null).allow("").optional(),
        page: joi.number().min(0).required().optional(),
        limit: joi.number().integer().min(0).allow(null, "").optional().messages({
            "number.min": "Limit cannot be negative.",
            "number.base": "Limit must be a valid integer.",
        }),
        order: joi.string().valid('ASC', 'DESC').optional().default('DESC').allow(null).allow("").optional(),
        column: joi.string().trim().valid('id', 'name', 'created_by', 'updated_by', 'created_at', 'updated_at',
            'scientific_name', 'description', 'plant_type', 'sunlight_requirement', 'watering_frequency', 'soil_type',
            'temperature_range', 'growth_rate').optional().default('updated_at').allow(null).allow("").optional().messages({
                "string.valid": "Invalid column name.",
            }),
    })
        .unknown(false),
}

export {
    createPlantValidator,
    getPlantDetailbyid,
    updatePlantSchema,
    deletePlantSchema,
    getplants
}