const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const VehicleBooking = sequelize.define('VehicleBooking', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Bookings', // Name of the Booking table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Vehicles',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    pickupLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dropoffLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    vehicleDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requiresPersonnel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    numPersonnel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    personnelDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
  }, {
    timestamps: true,
    tableName: 'VehicleBookings',
    underscored: true,
  });

  VehicleBooking.associate = (models) => {
    VehicleBooking.belongsTo(models.Bookings, { foreignKey: 'bookingId' });
    VehicleBooking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
  };

  return VehicleBooking;
};
