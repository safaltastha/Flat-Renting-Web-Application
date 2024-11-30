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
          model: "users",
          key: "id",
        },
      },
      propertyId: {
        // Optional relationship to properties
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "properties",
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

    Vehicle.belongsTo(models.Property, {
      foreignKey: "propertyId",
      as: "property", // Alias for easier queries
      onDelete: "SET NULL",
    });
  };

  return Vehicle;
};
