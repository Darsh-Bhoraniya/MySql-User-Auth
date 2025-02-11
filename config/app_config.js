import { Sequelize } from "sequelize";
import config from "./db_config.js";


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

sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL connected successfully");
  })
  .catch((err) => {
    console.error("MySQL connection error:", err);
  });

export default sequelize;