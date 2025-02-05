import { Sequelize } from "sequelize";
import config from "./db.js";

const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password,
  {
    host: config.mysql.host,
    dialect: "mysql",
    port: config.mysql.port,
    logging: false,
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