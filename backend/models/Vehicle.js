const Users = require("./Users");

module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    "Vehicle",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      availableStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      availableEnd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pricingPerHour: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      vehicleFeatures: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vehicleLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availabilityTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      tableName: "vehicles",
    }
  );

  Vehicle.associate = (models) => {
    Vehicle.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Vehicle.hasMany(models.Booking, {
      foreignKey: "vehicleId",
      as: "bookings",
      onDelete: "CASCADE",
    });

    Vehicle.hasMany(models.Rating, {
      foreignKey: "vehicleId", // Foreign key in the Rating model
      as: "ratings", // Alias for easier querying
    });

    Vehicle.hasMany(models.Media, {
      foreignKey: "vehicleId",
      as: "media", // Optional: can help in naming when accessing in queries
      onDelete: "CASCADE",
    });
  };

  return Vehicle;
};
