const Users = require("./Users");
module.exports = (sequelize, DataTypes) => {
  const SavedProperties = sequelize.define(
    "SavedProperties",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Correct model name here
          key: "id",
        },
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Property", // Correct model name here
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "saved_properties", // Explicit table name
    }
  );

  SavedProperties.associate = (models) => {
    // Associate with User
    SavedProperties.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "userDetails",
    });

    // Associate with Property
    SavedProperties.belongsTo(models.Property, {
      foreignKey: "propertyId",
      onDelete: "CASCADE",
      as: "propertyDetails",
    });
  };

  return SavedProperties;
};
