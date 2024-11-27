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
    Users.hasMany(models.Rating, {
      foreignKey: "userId", // Foreign key in the Rating model
      as: "ratings", // Alias for easier querying
    });
    Users.hasMany(models.RatingReactions, {
      foreignKey: "userId",
      as: "ratingReactions",
    });

    Users.hasMany(models.Contact, { foreignKey: "userId" });
  };

  return Users;
};
