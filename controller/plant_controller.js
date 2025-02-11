import plant_services from '../services/plant_services.js';

const getPlantsDetails = async (req, res) => {
    // let user_id = req.user.user_id;
    let req_data = req.query;
    const result = await plant_services.getPlantsDetailsfromDB(req_data);
    if (result.data === null) {
        return Promise.reject({
            type: result.type,
            message_type: result.message_type,
            module_name: result.module_name,
            data: null,
        })
    }
    return {
        type: result.type,
        message_type: result.message_type,
        module_name: result.module_name,
        data: result.data,
    };
}
const UpdatePlant = async (req, res) => {
    const plant_id = req.params.id; // Ensure plant_id is coming from request
    const data = req.body;
    const update_plant = await plant_services.UpdatePlantInDB(data, plant_id);
    if (update_plant.data === null) {
        return Promise.reject({
            type: update_plant.type,
            message_type: update_plant.message_type,
            module_name: update_plant.module_name,
            data: null,
        });
    }
    return {
        type: update_plant.type,
        message_type: update_plant.message_type,
        module_name: update_plant.module_name,
        data: update_plant.data,
    };
}
const createPlant = async (req, res) => {
    // let user_id = req.user.user_id;
    let data_to_create = req.body;
    const user_id = req.user?.user_id;
    data_to_create.user_id = user_id;

    const result = await plant_services.createPlantInDB(data_to_create);

    if (result.data === null) {
        return Promise.reject({
            type: result.type,
            message_type: result.message_type,
            module_name: result.module_name,
            data: null,
        })
    }
    return {
        type: "CREATE_SUCCESS",
        module_name: "Plant",
        message_type: "message_type",
        data: result.data,
    };
}
const DeletePlant = async (req, res) => {
    const plant_id = req.params.id;
    const delete_plant = await plant_services.DeletePlantInDB(plant_id);
    if (delete_plant.data === null) {
        return Promise.reject({
            type: delete_plant.type,
            message_type: delete_plant.message_type,
            module_name: delete_plant.module_name,
            data: null,
        });
    }
    return {
        type: delete_plant.type,
        message_type: delete_plant.message_type,
        module_name: delete_plant.module_name,
        data: delete_plant.data,
    };
}
export {
    getPlantsDetails,
    createPlant,
    UpdatePlant,
    DeletePlant
}   