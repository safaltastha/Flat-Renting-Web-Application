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
            args: /^(?:\+977)?(98|97)\d{11}$/,
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

    // A user can have multiple bookings as a landlord
    Users.hasMany(models.Property, {
      foreignKey: "userId", // Foreign key in Property model
      as: "landlordProperties", // Alias for properties posted by this landlord
      onDelete: "CASCADE",
    });

    Users.hasMany(models.Rating, {
      foreignKey: "userId", // Foreign key in the Rating model
      as: "ratings", // Alias for easier querying
    });

    Users.hasMany(models.Contact, { foreignKey: "userId" });

    // A user can have many bookings
    Users.hasMany(models.Bookings, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Users.belongsToMany(models.Property, {
      through: models.SavedProperties, // Intermediate table
      as: "savedProperties", // Alias for easier querying
      foreignKey: "userId", // Key in the SavedProperties table
      otherKey: "propertyId", // The other key in the SavedProperties table
    });
    // A User can have many RatingReactions
    Users.hasMany(models.RatingReactions, {
      foreignKey: "userId",
      as: "ratingReactions",
    });
  };

  return Users;
};
