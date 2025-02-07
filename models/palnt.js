import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
    class Plant extends Model {
        static associate(models) {
            Plant.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
            });
        }
    }
    Plant.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            scientific_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            plant_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sunlight_requirement: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            watering_frequency: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            soil_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            temperature_range: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            growth_rate: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Plant",
            tableName: "plants",
            timestamps: false,
            // createdAt: "created_at",
            // updatedAt: "updated_at",
            
        }
    );
    return Plant;
}