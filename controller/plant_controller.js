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
export {
    getPlantsDetails,
    createPlant
}   