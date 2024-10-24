module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "Media",
    {
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
  };

  return Media;
};
