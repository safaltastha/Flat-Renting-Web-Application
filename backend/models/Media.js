module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "Media",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_type: {
        type: DataTypes.ENUM("image", "video"),
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Properties",
          key: "id",
        },
        allowNull: true, // Allow null since this could be a vehicle image
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Vehicles", // Assuming you have a Vehicles model defined
          key: "id",
        },
        allowNull: true, // Allow null since this could be a property image
      },
      entityType: {
        type: DataTypes.ENUM("property", "vehicle"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "media",
    }
  );

  Media.associate = (models) => {
    Media.belongsTo(models.Property, {
      foreignKey: "propertyId",
      onDelete: "CASCADE",
    });

    Media.belongsTo(models.Vehicle, {
      foreignKey: "vehicleId",
      onDelete: "CASCADE",
    });
  };

  return Media;
};
