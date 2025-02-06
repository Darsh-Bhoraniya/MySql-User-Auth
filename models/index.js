"use strict";

import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import { fileURLToPath } from "url";
import config from "../config/db_config.js";
import app_config from "../config/app_config.js";
// import logAction from "../middlewares/audit_logs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const config = db_config[env];
const db = {};

const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password,
  {
    host: config.mysql.host,
    dialect: 'mysql',
    port: config.mysql.port,
    logging: false,  // Optional: to turn off SQL logging in the console
  }
);
const loadModels = async () => {
  const files = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      !file.includes(".test")
    );
  });

  const imports = files.map(async (file) => {
    try {
      const modelPath = path.join(__dirname, file);
      const modelModule = await import(new URL(`file://${modelPath}`));
      const model = modelModule.default ? modelModule.default(sequelize, DataTypes) : null;  
      if (model) {
        db[model.name] = model;
      }
  
    } catch (error) {
      console.error(`Error loading model from file: ${file}`, error);
    }
  });
  

  await Promise.all(imports);
};

await loadModels();

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
