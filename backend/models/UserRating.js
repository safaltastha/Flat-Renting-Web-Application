// models/VehicleRating.js
module.exports = (sequelize, DataTypes) => {
  const UserRating = sequelize.define(
    "UserRating",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating_value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      review_text: {
        type: DataTypes.TEXT,
        allowNull: true, // Optional review text
      },
      rater_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Refers to the User model (make sure 'Users' matches the actual table name)
          key: "id",
        },
        onDelete: "CASCADE",
      },
      rated_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Refers to the User model (make sure 'Users' matches the actual table name)
          key: "id",
        },
        onDelete: "CASCADE",
      },
      rated_user_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["tenant", "landlord", "vehicle_supplier"]],
        },
      },
    },
    {
      tableName: "userratings", // Table name
      timestamps: true, // Sequelize automatically adds createdAt and updatedAt fields
    }
  );

  // Associations (if any)
  UserRating.associate = (models) => {
    // Define associations if necessary, like associating with the `User` model
    UserRating.belongsTo(models.Users, { foreignKey: "rater_id", as: "rater" });
    UserRating.belongsTo(models.Users, {
      foreignKey: "rated_user_id",
      as: "ratedUser",
    });
  };

  return UserRating;
};
