// models/VehicleRating.js
module.exports = (sequelize, DataTypes) => {
    const VehicleRating = sequelize.define("VehicleRating", {
      rating_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Vehicles', // This should match the name of your Vehicles table
          key: 'id',
        },
      },
      rater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
  
    VehicleRating.associate = (models) => {
      VehicleRating.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
      VehicleRating.belongsTo(models.Users, { foreignKey: 'rater_id', as: 'rater' });
    };
  
    return VehicleRating;
  };
  