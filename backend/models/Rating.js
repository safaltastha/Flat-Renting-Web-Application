const Users = require("./Users");
const Property = require("./Property");
const Vehicle = require("./Vehicle");

module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        references: {
          model: Property,
          key: "id",
        },
        allowNull: true, // Can be null if the rating is for a vehicle
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        references: {
          model: Vehicle,
          key: "id",
        },
        allowNull: true, // Can be null if the rating is for a property
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: "id",
        },
        allowNull: false, // The user providing the rating
      },
    },
    {
      timestamps: true,
      tableName: "ratings",
    }
  );
  // Associations
  Rating.associate = (models) => {
    Rating.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });
    Rating.belongsTo(models.Property, {
      foreignKey: "propertyId",
      as: "property",
    });
    Rating.belongsTo(models.Vehicle, {
      foreignKey: "vehicleId",
      as: "vehicle",
    });
  };

  return Rating;
};
