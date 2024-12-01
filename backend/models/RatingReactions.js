module.exports = (sequelize, DataTypes) => {
  const RatingReactions = sequelize.define(
    "RatingReactions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Replace with your actual User model name if different
          key: "id",
        },
        onDelete: "CASCADE",
      },
      ratingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Rating", // Replace with your actual Rating model name if different
          key: "id",
        },
        onDelete: "CASCADE",
      },
      reaction: {
        type: DataTypes.ENUM("like", "dislike"),
        allowNull: false,
      },
    },
    {
      tableName: "RatingReactions",
      timestamps: true, // Enables createdAt and updatedAt
    }
  );

  RatingReactions.associate = (models) => {
    // RatingReaction belongs to a User
    RatingReactions.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });

    // RatingReaction belongs to a Rating
    RatingReactions.belongsTo(models.Rating, {
      foreignKey: "ratingId",
      as: "rating",
    });
  };

  return RatingReactions;
};
