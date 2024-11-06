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
      name: {
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

    Users.hasMany(models.Booking, {
      foreignKey: "userId",
      as: "tenantBookings", // Alias for bookings made by this tenant
      onDelete: "CASCADE",
    });

    // A user can have multiple bookings as a landlord
    Users.hasMany(models.Property, {
      foreignKey: "userId", // Foreign key in Property model
      as: "landlordProperties", // Alias for properties posted by this landlord
      onDelete: "CASCADE",
    });

    // Define the association with Booking (if a landlord wants to see their bookings)
    Users.hasMany(models.Booking, {
      foreignKey: "propertyId", // If a landlord is associated with bookings
      as: "landlordBookings", // Alias for bookings of properties they posted
      onDelete: "CASCADE",
    });

    Users.hasMany(models.BookTest, {
      foreignKey: "userId",
      as: "tenantBookTests", // Alias for BookTests made by this tenant
      onDelete: "CASCADE",
    });

    // A user can have multiple BookTests as a landlord
    Users.hasMany(models.Test, {
      foreignKey: "userId", // Foreign key in Property model
      as: "landlordBookProperties", // Alias for properties posted by this landlord
      onDelete: "CASCADE",
    });

    // Define the association with BookTest (if a landlord wants to see their BookTests)
    Users.hasMany(models.BookTest, {
      foreignKey: "userId", // If a landlord is associated with BookTests
      as: "landlordBookTests", // Alias for bookings of properties they posted
      onDelete: "CASCADE",
    });

    // Ratings given by the user
    Users.hasMany(models.Rating, {
      foreignKey: "rater_id",
      as: "givenRatings",
    });

    // Ratings received by the user (as landlord, tenant, or vehicle supplier)
    Users.hasMany(models.Rating, {
      foreignKey: "target_id",
      as: "receivedRatings",
    });

    // As a "rater", a user can have many ratings they have given
    Users.hasMany(models.UserRating, {
      foreignKey: "rater_id",
      as: "ratingsGiven", // Alias to represent ratings given by the user
    });

    // As a "ratedUser", a user can have many ratings they have received
    Users.hasMany(models.UserRating, {
      foreignKey: "rated_user_id",
      as: "ratingsReceived", // Alias to represent ratings received by the user
    });
  };

  return Users;
};
