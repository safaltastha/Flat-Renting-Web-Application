const Users = require("./Users");

module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define(
    "Test",
    {
      category: {
        type: DataTypes.ENUM("flat", "room", "apartment"),
        allowNull: true,
      },
      locationCity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      locationStreetNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numOfSpaces: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      numOfBedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        allowNull: true,
      },
      monthlyRent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
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
        allowNull: true,
      },
      houseRule: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      photo: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },

      video: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      
    },
    {
      timestamps: true,
      tableName: "tests",
    }
  );

  

  return Test;
};
