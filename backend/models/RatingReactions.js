module.exports = (sequelize, DataTypes) => {
  const RatingReactions = sequelize.define(
    "RatingReactions",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ratingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Ratings", // Name of the ratings table
          key: "id",
        },
        allowNull: false, // Reaction must be linked to a rating
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Name of the users table
          key: "id",
        },
        allowNull: false, // Reaction must be linked to a user
      },
      type: {
        type: DataTypes.ENUM("like", "dislike"),
        allowNull: false, // Specify whether it's a like or dislike
      },
    },
    {
      timestamps: true,
      tableName: "rating_reactions",
    }
  );

  // Associations
  RatingReactions.associate = (models) => {
    RatingReactions.belongsTo(models.Rating, {
      foreignKey: "ratingId",
      as: "rating",
    });
    RatingReactions.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return RatingReactions;
};
