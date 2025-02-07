import { Op } from "sequelize";
import { ApiError } from "../utils/response/api_error.js";
import { response_objects } from "../utils/response/response_messages.js";
import Models from "../models/index.js";

// Function to get the plant details from the database
const getPlantsDetailsfromDB = async (req_query) => {
    try {
        const { search } = req_query;  // ✅ Fixed typo
        const order = req_query.order ? req_query.order : 'DESC';
        const column = req_query.column ? req_query.column : 'updatedAt';
        const order_clause = [[column, order]];

        const page =
            !isNaN(Number(req_query.page)) && Number(req_query.page) >= 0
                ? Number(req_query.page)
                : 1;
        const limit = Number(req_query.limit) || 10;
        const offset = page > 0 ? (page - 1) * limit : 0;

        let basequery = {};
        if (search) {  // ✅ Use 'search' instead of 'serach'
            basequery = {
                ...basequery,
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { scientific_name: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } },
                    { plant_type: { [Op.like]: `%${search}%` } },
                    { sunlight_requirement: { [Op.like]: `%${search}%` } },
                    { watering_frequency: { [Op.like]: `%${search}%` } },
                    { soil_type: { [Op.like]: `%${search}%` } },
                    { temperature_range: { [Op.like]: `%${search}%` } },
                    { growth_rate: { [Op.like]: `%${search}%` } }
                ]
            };
        }

        const findAllPlants = await Models.Plant.findAndCountAll({
            where: basequery,
            limit,
            offset,
            distinct: true,
            order: order_clause,
        });

        // Prepare the response data
        const data_to_send = {
            data: findAllPlants.rows,
            counts: {
                all: findAllPlants.count,  // ✅ Total matching records
            },
            paginator: {
                item_count: findAllPlants.count,  // ✅ Count of matched records
                per_page: limit,
                page_count: Math.ceil(findAllPlants.count / limit),
                current_page: page,
            },
        };

        // Return the response object
        return {
            type: "LIST_RETRIEVED",
            message_type: "message",
            module_name: "Plant",
            data: data_to_send,
        };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, response_objects[0].message);
    }
};

export default {
    getPlantsDetailsfromDB
}