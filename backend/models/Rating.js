module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      score: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "properties",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "vehicles",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: true,
    }
  );

  Rating.associate = (models) => {
    Rating.belongsTo(models.Property, {
      foreignKey: "propertyId",
      as: "property", // Alias for accessing the associated property
    });

    Rating.belongsTo(models.Vehicle, {
      foreignKey: "vehicleId",
      as: "vehicle", // Alias for accessing the associated property
    });

    Rating.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user", // Alias for accessing the associated user
    });
    Rating.hasMany(models.RatingReactions, {
      foreignKey: "ratingId",
      as: "reactions",
    });
  };

  return Rating;
};
