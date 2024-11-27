module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define(
    "Bookings",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Assumes a Users model for tenants
          key: "id",
        },
        onDelete: "CASCADE",
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Properties", // Assumes a Properties model for properties
          key: "id",
        },
        onDelete: "SET NULL",
      },

      status: {
        type: DataTypes.ENUM("available", "booked", "cancelled"),
        allowNull: false,
        defaultValue: "available",
      },
    },
    {
      tableName: "Bookings",
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  // Associations
  Bookings.associate = (models) => {
    Bookings.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Bookings.belongsTo(models.Property, {
      foreignKey: "propertyId",
      onDelete: "SET NULL",
      as: "property",
    });
    Bookings.hasOne(models.VehicleBooking, {
      foreignKey: "bookingId",
      as: "vehicleBooking",
    });
  };

  return Bookings;
};
