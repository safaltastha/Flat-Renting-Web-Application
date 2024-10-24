const Users = require("./Users");

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      category: {
        type: DataTypes.ENUM("flat", "room", "apartment"),
        allowNull: false,
      },
      locationCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationStreetNumber: {
        type: DataTypes.STRING,
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
    Property.hasMany(models.Media, {
      foreignKey: "propertyId",
      as: "media", // Optional: can help in naming when accessing in queries
      onDelete: "CASCADE",
    });
  };

  return Property;
};
