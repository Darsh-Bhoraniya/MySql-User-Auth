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
export {
    getPlantsDetails
}   