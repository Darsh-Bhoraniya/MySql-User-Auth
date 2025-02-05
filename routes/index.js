import express, { Router } from "express";
import auth_routes from "./auth_routes.js";
// import plant_routes from "./plant_routes.js";

const routes = express.Router();

routes.use(auth_routes);
// routes.use(plant_routes);

export default routes;
