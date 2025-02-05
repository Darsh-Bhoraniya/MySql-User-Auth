import { DataTypes } from "sequelize";
import sequelize from "../config/app_config.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Assuming email should be unique for each user
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles", // The referenced table name (roles)
        key: "id",      // The referenced column (id in the roles table)
      },
      onUpdate: 'CASCADE',  // When the referenced role's id is updated, update the user’s role_id
      onDelete: 'SET NULL', // When the referenced role is deleted, set the user’s role_id to NULL
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "users", // Ensure the table name is 'users'
    timestamps: true,   // Automatically handle `createdAt` and `updatedAt` fields
    createdAt: "createdAt", // Explicitly define the createdAt column
    updatedAt: "updatedAt", // Explicitly define the updatedAt column
  }
);

export default User;
