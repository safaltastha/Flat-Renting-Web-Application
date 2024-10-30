module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Property",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      roomType: {
        type: DataTypes.ENUM("Bedroom", "LivingRoom", "Kitchen", "Bathroom"),
        allowNull: false,
      },
      length: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        comment: "Length of the room in meters",
      },
      width: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        comment: "Width of the room in meters",
      },
    },
    {
      timestamps: true,
      tableName: "rooms",
    }
  );

  Room.associate = (models) => {
    Room.belongsTo(models.Property, {
      foreignKey: "propertyId",
      onDelete: "CASCADE",
    });
  };

  return Room;
};
