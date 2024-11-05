module.exports = (sequelize, DataTypes) => {
  const BookTest = sequelize.define(
    "BookTest",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Assumes a Users model for tenants
          key: "id",
        },
        onDelete: "CASCADE",
      },
      testId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tests", // Assumes a Properties model for properties
          key: "id",
        },
        onDelete: "CASCADE",
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Allows null if no vehicle is booked
        references: {
          model: "Vehicles", // Assumes a Vehicles model for vehicles
          key: "id",
        },
        onDelete: "SET NULL", // If a vehicle is deleted, the field is set to null
      },
      status: {
        type: DataTypes.ENUM("available", "booked", "cancelled"),
        allowNull: false,
        defaultValue: "available",
      },
    },
    {
      tableName: "BookTests",
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  // Associations
  BookTest.associate = (models) => {
    BookTest.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    BookTest.belongsTo(models.Test, {
      foreignKey: "testId",
      onDelete: "CASCADE",
      as: "test",
    });

    BookTest.belongsTo(models.Vehicle, {
      foreignKey: "vehicleId",
      onDelete: "SET NULL",
      as: "vehicle",
    });
  };

  return BookTest;
};
