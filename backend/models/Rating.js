// models/Rating.js
const Users = require("./Users");
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    rating_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating_type: {
      type: DataTypes.ENUM(
        "property",
        "vehicle",
        "landlord",
        "vehicle_supplier",
        "tenant",
        "test"
      ),
      allowNull: false,
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rater_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Rating.associate = (models) => {
    // Rating is associated with the User model for both rater and target
    Rating.belongsTo(models.Users, { foreignKey: "rater_id", as: "rater" });

    // Rating is associated with the User model for the rated user (target)
    Rating.belongsTo(models.Users, {
      foreignKey: "target_id",
      as: "ratedUser",
    });

    // Conditional associations based on rating_type
    Rating.belongsTo(models.Property, {
      foreignKey: "target_id",
      as: "property",
      constraints: false, // Disable constraints because we have multiple target models
      scope: {
        rating_type: "property",
      },
    });

    Rating.belongsTo(models.Vehicle, {
      foreignKey: "target_id",
      as: "vehicle",
      constraints: false,
      scope: {
        rating_type: "vehicle",
      },
    });

    Rating.belongsTo(models.Test, {
      foreignKey: "target_id",
      as: "test",
      constraints: false,
      scope: {
        rating_type: "test",
      },
    });
  };

  return Rating;
};
