const Users = require("./Users");

module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define(
    "Test",
    {
      category: {
        type: DataTypes.ENUM("flat", "room", "apartment"),
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
      tableName: "tests",
    }
  );

  Test.associate = (models) => {
    // Define the association with Users
    Test.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // Define the association with BookTest
    Test.hasMany(models.BookTest, {
      foreignKey: "testId",
      as: "booktests",
      onDelete: "CASCADE",
    });
  };

  return Test;
};
