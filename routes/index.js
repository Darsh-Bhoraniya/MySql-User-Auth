import express, { Router } from "express";
import auth_routes from "./auth_routes.js";
import plant_routes from "./plant_routes.js";
import chatRoutes from "./chatRoutes.js";

const routes = express.Router();

routes.use(auth_routes);
routes.use(plant_routes);
routes.use(chatRoutes)
export default routes;
