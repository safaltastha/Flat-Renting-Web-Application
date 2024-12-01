const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const VehicleBooking = sequelize.define(
    "VehicleBooking",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bookings", // Name of the Booking table
          key: "id",
        },
        onDelete: "CASCADE",
        field: "booking_id", // Map to the column name in the DB
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Vehicles",
          key: "id",
        },
        onDelete: "SET NULL",
        field: "vehicle_id", // Map to the column name in the DB
      },
      pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "pickup_location", // Map to the column name in the DB
      },
      dropoffLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "dropoff_location", // Map to the column name in the DB
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "date", // Map to the column name in the DB
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        field: "time", // Map to the column name in the DB
      },
      vehicleDuration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "vehicle_duration", // Map to the column name in the DB
      },
      requiresPersonnel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "requires_personnel", // Map to the column name in the DB
      },
      numPersonnel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 1,
        },
        field: "num_personnel", // Map to the column name in the DB
      },
      personnelDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 1,
        },
        field: "personnel_duration", // Map to the column name in the DB
      },
    },
    {
      timestamps: true,
      tableName: "VehicleBookings",
      underscored: true,
    }
  );

  VehicleBooking.associate = (models) => {
    VehicleBooking.belongsTo(models.Bookings, { foreignKey: "bookingId" });
    VehicleBooking.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
  };

  return VehicleBooking;
};
