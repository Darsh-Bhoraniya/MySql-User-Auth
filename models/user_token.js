import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class UserToken extends Model {
    static associate(models) {
      UserToken.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  UserToken.init(
    {
      token_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Ensure the correct table name is referenced
          key: 'user_id', // Reference the 'user_id' column in the 'users' table
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token_expiry: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserToken',
      tableName: 'user_tokens', // Specify the table name
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return UserToken;
}