import express, { Router } from "express";
import auth_routes from "./auth_routes.js";
<<<<<<< HEAD
// import plant_routes from "./plant_routes.js";
=======
import plant_routes from "./plant_routes.js";
>>>>>>> c0e191b11c7948ed6b1fb8ae588933247fc1566b

const routes = express.Router();

routes.use(auth_routes);
<<<<<<< HEAD
// routes.use(plant_routes);
=======
routes.use(plant_routes);
>>>>>>> c0e191b11c7948ed6b1fb8ae588933247fc1566b

export default routes;
