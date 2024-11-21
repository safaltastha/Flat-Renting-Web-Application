module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define(
      "Contact",
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
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Users", // Assuming there is a Users model
            key: "id",
          },
        },
      },
      {
        timestamps: true,
        tableName: "contacts",
      }
    );
  
    // Define associations
    Contact.associate = (models) => {
      Contact.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "CASCADE", // If a user is deleted, related contacts are removed
      });
    };
  
    return Contact;
  };
  