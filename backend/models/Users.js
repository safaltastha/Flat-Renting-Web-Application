module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("tenant", "landlord", "vehicleSupplier", "admin"),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^\+977 ?\d{10}$/,
            msg: "Phone number must be in the format +977XXXXXXXXXX",
          },
        },
      },

      userPhoto: {
        type: DataTypes.STRING,
        allowNull: true, // Optional, can be left empty initially
        defaultValue: null, // Default to null if no profile photo is provided
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetTokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
    }
  );
  Users.associate = (models) => {
    // A user can have multiple properties
    Users.hasMany(models.Property, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    // A user can have multiple vehicles
    Users.hasMany(models.Vehicle, {
      foreignKey: "userId", // Foreign key in Vehicle model
      as: "vehicles",
      onDelete: "CASCADE",
    });
  };

  return Users;
};
