const Users = require("./Users");
const Room = require("./Room");

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      category: {
        type: DataTypes.ENUM("flat", "room", "apartment"),
        allowNull: false,
      },
      locationCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationStreetNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      StreetName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      numOfSpaces: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numOfBedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numOfLivingrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      numOfBathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      numOfKitchens: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      floor: {
        type: DataTypes.ENUM("first", "second", "third", "fourth", "fifth"),
        allowNull: false,
      },
      monthlyRent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      advancedRent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      features: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      houseRule: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("available", "booked"),
        defaultValue: "available", // Set default status to 'available'
        allowNull: false,
      },

      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "properties",
    }
  );

  Property.associate = (models) => {
    Property.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Property.hasMany(models.Room, {
      foreignKey: "propertyId",
      as: "rooms",
      onDelete: "CASCADE",
    });
    Property.hasMany(models.Booking, {
      foreignKey: "propertyId",
      as: "bookings",
      onDelete: "CASCADE",
    });

    Property.hasMany(models.Rating, {
      foreignKey: "propertyId", // Foreign key in the Rating model
      as: "ratings", // Alias for easier querying
    });

    Property.hasMany(models.Media, {
      foreignKey: "propertyId",
      as: "media", // Optional: can help in naming when accessing in queries
      onDelete: "CASCADE",
    });
  };

  return Property;
};
